import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementIsHTMLElement, ElementIsNot, ElementIsVisible } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { AtomicRule } from '../lib/AtomicRule.object';
import Color from 'colorjs.io';

interface RGBColor {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

interface NonSolidEvaluation {
  test: Test;
  element: QWElement;
  background: string;
  text: string;
  foreground: RGBColor | undefined;
  pseudoOpacity: number;
  fontSize: string;
  fontWeight: string;
  textShadow: string;
}

interface RenderedText {
  text: string;
  pseudoStyle: '::placeholder' | null;
  styleElement?: QWElement;
}

interface RenderedStyles {
  foreground: string;
  fontSize: string;
  fontWeight: string;
  opacity: number;
  textShadow: string;
  hasInaccessiblePseudoStyles: boolean;
}

/** Result of resolving an element's effective solid background. */
type BackgroundResolution =
  | { kind: 'color'; background: RGBColor; foreground: RGBColor }
  | { kind: 'cantTell'; resultCode: 'W2' | 'W3' };

type BackgroundLayerResolution =
  | { kind: 'color'; color: RGBColor }
  | { kind: 'cantTell'; resultCode: 'W2' | 'W3' };

const WHITE: RGBColor = { red: 255, green: 255, blue: 255, alpha: 1 };
const TRANSPARENT: RGBColor = { red: 0, green: 0, blue: 0, alpha: 0 };
const LARGE_BOLD_TEXT_PX = (14 * 96) / 72;
const LARGE_TEXT_PX = (18 * 96) / 72;
const NON_TEXT_INPUT_TYPES = new Set(['hidden', 'range', 'color', 'checkbox', 'radio', 'image']);
const PLACEHOLDER_INPUT_TYPES = new Set(['text', 'search', 'tel', 'url', 'email', 'password', 'number']);
const PLACEHOLDER_STYLE_PROPERTIES = ['color', 'opacity', 'font-size', 'font-weight', 'text-shadow'];

/**
 * QW-ACT-R37 — text has sufficient colour contrast.
 *
 * The implementation resolves solid foreground/background pixels through
 * ancestor opacity groups. Two-stop horizontal gradients are evaluated only
 * when the text geometry and the full contrast interval can be proven; other
 * image and gradient backgrounds produce a warning. In addition to afw4f7's
 * text-node targets, rendered form-control text is checked to cover the values
 * and placeholders that WCAG 1.4.3 also requires.
 */
class QW_ACT_R37 extends AtomicRule {
  /** Memoised accessible-name roots for disabled widgets. */
  private disabledLabelCache?: { source: unknown; selectors: Set<string> };

  /**
   * Evaluate one candidate element and emit a result only when it is applicable.
   *
   * @param element - Candidate element supplied by the ACT rule runner.
   */
  @ElementExists
  @ElementIsHTMLElement
  @ElementIsNot(['html', 'head', 'body', 'script', 'style', 'meta'])
  @ElementIsVisible
  execute(element: QWElement): void {
    // Keep the explicit visibility guard because this method can also be
    // invoked outside the decorator-driven runner in tests and integrations.
    if (!window.DomUtils.isElementVisible(element)) return;

    // ACT targets text nodes. QualWeb intentionally extends that target set to
    // rendered form values/placeholders, which are visible WCAG 1.4.3 content
    // even though browsers do not expose them as child text nodes.
    const renderedText = this.getRenderedText(element);
    if (renderedText.text === '') return;

    if (!element.isElementHTMLElement()) return;

    // Disabled group/widget content, including text used as its accessible
    // label, is outside afw4f7 applicability.
    if (this.hasDisabledAncestorOrLabel(element, window.disabledWidgets)) return;

    const renderedStyles = this.getRenderedStyles(element, renderedText);
    const fgColor = renderedStyles.foreground;
    const bgColor = this.getBackground(element);
    const opacity = this.parseOpacity(element.getElementStyleProperty('opacity', null));
    const pseudoOpacity = renderedStyles.opacity;
    const fontSize = renderedStyles.fontSize;
    const fontWeight = renderedStyles.fontWeight;
    const textShadow = renderedStyles.textShadow;

    const test = new Test();
    const parsedFG = this.parseRGBString(fgColor);

    // Element opacity applies to text, pseudo-elements and their shadows.
    if (opacity === 0) return;

    if (renderedStyles.hasInaccessiblePseudoStyles) {
      // Cross-origin stylesheets can affect ::placeholder but cannot be read by
      // the CSSOM. A warning is safer than evaluating browser fallback styles.
      this.emit(test, element, Verdict.WARNING, 'W4');
      return;
    }

    // Alpha-zero `color` is normally unpainted, but shadows, strokes, fills and
    // background-clipped text can still render glyph pixels independently.
    if (this.handleTransparentText(test, element, parsedFG, opacity * pseudoOpacity, textShadow)) return;

    if (this.hasDisqualifyingShadow(textShadow, parseFloat(fontSize))) {
      this.emit(test, element, Verdict.WARNING, 'W1');
      return;
    }

    if (
      this.evaluateNonSolidBackground({
        test,
        element,
        background: bgColor,
        text: renderedText.text,
        foreground: parsedFG,
        pseudoOpacity,
        fontSize,
        fontWeight,
        textShadow
      })
    )
      return;

    // The non-solid branch has either emitted a result or declined the target.
    // From here the normal alpha-composited solid-colour path is sufficient.
    if (!parsedFG) return;
    parsedFG.alpha *= pseudoOpacity;
    const colors = this.resolveSolidColors(element, parsedFG);
    if (colors.kind === 'cantTell') {
      this.emit(test, element, Verdict.WARNING, colors.resultCode);
      return;
    }

    // ACT applicability requires visible text, defined as content whose
    // rendering changes pixels. Identical foreground and background colors do
    // not change pixels and are therefore outside this atomic rule.
    if (this.equals(colors.background, colors.foreground)) return;

    if (!this.isHumanLanguage(renderedText.text)) {
      this.emit(test, element, Verdict.PASSED, 'P2');
      return;
    }

    const contrastRatio = this.getContrast(colors.background, colors.foreground);
    const isValid = this.hasValidContrastRatio(contrastRatio, fontSize, this.isBold(fontWeight));
    this.emit(test, element, isValid ? Verdict.PASSED : Verdict.FAILED, isValid ? 'P1' : 'F1');
  }

  // ---------------------------------------------------------------------------
  // Applicability helpers
  // ---------------------------------------------------------------------------

  /**
   * Returns the text that is currently painted by the element. Form controls
   * expose their rendered text through DOM properties rather than text-node
   * children, so values changed at runtime are intentionally preferred over
   * their original attributes.
   *
   * @param element - Candidate element whose painted text is requested.
   * @returns Rendered text together with its pseudo/style source.
   */
  private getRenderedText(element: QWElement): RenderedText {
    const nodeName = element.getElementTagName();

    if (nodeName === 'input') return this.getInputText(element);
    if (nodeName === 'textarea') return this.getTextAreaText(element);
    if (nodeName === 'select') return this.getSelectText(element);
    return { text: element.getElementOwnText().trim(), pseudoStyle: null };
  }

  /**
   * Return the value, default label or placeholder currently painted by an input.
   *
   * @param element - Input element whose rendered text is requested.
   * @returns Rendered input text and any pseudo-element style source.
   */
  private getInputText(element: QWElement): RenderedText {
    const inputType = (element.getElementProperty('type') || 'text').toLowerCase();
    if (NON_TEXT_INPUT_TYPES.has(inputType)) return { text: '', pseudoStyle: null };

    const value = element.getElementProperty('value').trim();
    if (value !== '') return { text: value, pseudoStyle: null };

    // Empty submit/reset inputs still render a browser-provided default label.
    if (inputType === 'submit') return { text: 'Submit', pseudoStyle: null };
    if (inputType === 'reset') return { text: 'Reset', pseudoStyle: null };

    const placeholder = element.getElementAttribute('placeholder')?.trim() ?? '';
    return PLACEHOLDER_INPUT_TYPES.has(inputType) && placeholder !== ''
      ? { text: placeholder, pseudoStyle: '::placeholder' }
      : { text: '', pseudoStyle: null };
  }

  /**
   * Return the live textarea value, or its placeholder when the value is empty.
   *
   * @param element - Textarea element whose rendered text is requested.
   * @returns Live value or placeholder with its style source.
   */
  private getTextAreaText(element: QWElement): RenderedText {
    const value = element.getElementProperty('value').trim();
    if (value !== '') return { text: value, pseudoStyle: null };

    const placeholder = element.getElementAttribute('placeholder')?.trim() ?? '';
    return placeholder !== '' ? { text: placeholder, pseudoStyle: '::placeholder' } : { text: '', pseudoStyle: null };
  }

  /**
   * Return the label currently painted for the selected option.
   *
   * @param element - Select element whose collapsed label is requested.
   * @returns Selected label and the option supplying its foreground styles.
   */
  private getSelectText(element: QWElement): RenderedText {
    const selectedOption = element.getElement('option:checked');
    const selectedText = selectedOption
      ? (selectedOption.getElementProperty('label') || selectedOption.getElementText()).trim()
      : '';
    // The collapsed control paints the selected option's label and may inherit
    // its foreground/font styles, while the select still supplies the backdrop.
    return { text: selectedText, pseudoStyle: null, styleElement: selectedOption ?? undefined };
  }

  /**
   * Resolve styles from the source that actually paints the rendered text.
   *
   * @param element - Control or text container supplying the background.
   * @param renderedText - Text descriptor identifying pseudo/option style sources.
   * @returns Foreground, typography, opacity and shadow used for evaluation.
   */
  private getRenderedStyles(element: QWElement, renderedText: RenderedText): RenderedStyles {
    const pseudoResolution = renderedText.pseudoStyle
      ? element.getElementPseudoStyleProperties(PLACEHOLDER_STYLE_PROPERTIES, renderedText.pseudoStyle)
      : undefined;
    const pseudoStyles = pseudoResolution?.properties;
    const styleElement = renderedText.styleElement ?? element;
    return {
      foreground: this.getRenderedStyleProperty(styleElement, pseudoStyles, 'color'),
      fontSize: this.getRenderedStyleProperty(styleElement, pseudoStyles, 'font-size'),
      fontWeight: this.getRenderedStyleProperty(styleElement, pseudoStyles, 'font-weight'),
      opacity: renderedText.pseudoStyle ? this.getPseudoOpacity(element, pseudoStyles) : 1,
      textShadow: this.getRenderedStyleProperty(styleElement, pseudoStyles, 'text-shadow'),
      hasInaccessiblePseudoStyles: pseudoResolution?.hasInaccessibleStyles ?? false
    };
  }

  /**
   * Resolve a pseudo-element declaration or fall back to its originating element.
   *
   * @param element - Element supplying computed fallback styles.
   * @param pseudoStyles - Resolved authored pseudo-element declarations, if any.
   * @param property - CSS property to resolve.
   * @returns Effective authored or computed property value.
   */
  private getRenderedStyleProperty(
    element: QWElement,
    pseudoStyles: Record<string, string> | undefined,
    property: string
  ): string {
    const pseudoValue = pseudoStyles?.[property]?.trim();
    // CSS-wide keywords and currentColor depend on the originating element;
    // computed element styles are the correct fallback for these values.
    return pseudoValue &&
      !['currentcolor', 'inherit', 'initial', 'unset', 'revert', 'revert-layer'].includes(pseudoValue.toLowerCase())
      ? pseudoValue
      : element.getElementStyleProperty(property, null);
  }

  /**
   * Resolve placeholder opacity, including CSS-wide keyword behaviour.
   *
   * @param element - Originating form control supplying inherited opacity.
   * @param pseudoStyles - Resolved authored placeholder declarations, if any.
   * @returns Normalised placeholder opacity in the range zero to one.
   */
  private getPseudoOpacity(element: QWElement, pseudoStyles: Record<string, string> | undefined): number {
    const value = pseudoStyles?.opacity?.trim().toLowerCase();
    if (value === 'inherit') {
      return this.parseOpacity(element.getElementStyleProperty('opacity', null));
    }
    if (!value || ['initial', 'unset', 'revert', 'revert-layer'].includes(value)) return 1;
    return this.parseOpacity(value);
  }

  /**
   * Collect accessible-name source elements for disabled widgets once per run.
   * Without this, an external <label> could fail contrast even though the text
   * only labels an inapplicable disabled control.
   *
   * @param widgets - Disabled widgets collected for the current page.
   * @returns Selectors for elements contributing their accessible names.
   */
  private getDisabledLabelSelectors(widgets: QWElement[] | undefined): Set<string> {
    const cache = this.disabledLabelCache;
    if (cache && cache.source === widgets) {
      return cache.selectors;
    }

    const selectors = new Set<string>();
    for (const widget of widgets ?? []) {
      const accNameSelectors = window.AccessibilityUtils.getAccessibleNameSelector(widget) as
        | string
        | string[]
        | undefined;

      if (typeof accNameSelectors === 'string') {
        selectors.add(accNameSelectors);
      } else if (Array.isArray(accNameSelectors)) {
        for (const selector of accNameSelectors) selectors.add(selector);
      }
    }

    this.disabledLabelCache = { source: widgets, selectors };
    return selectors;
  }

  /**
   * Check both DOM ancestry and accessible-name relationships.
   *
   * @param element - Candidate text container.
   * @param widgets - Disabled widgets collected for the current page.
   * @returns True when the candidate belongs to disabled content.
   */
  private hasDisabledAncestorOrLabel(element: QWElement, widgets: QWElement[] | undefined): boolean {
    const disabledLabels = this.getDisabledLabelSelectors(widgets);
    let current: QWElement | null = element;

    while (current) {
      if (disabledLabels.has(current.getElementSelector()) || this.isDisabledGroupOrWidget(current)) return true;
      current = current.getElementParent();
    }
    return false;
  }

  /**
   * Return whether the element is a semantically disabled group or widget.
   *
   * @param element - Element whose role and disabled state are evaluated.
   * @returns True when group/widget semantics and disabled state are both present.
   */
  private isDisabledGroupOrWidget(element: QWElement): boolean {
    if (!window.AccessibilityUtils.isElementGroupOrWidget(element)) return false;
    const disabled = element.getElementAttribute('disabled') !== null;
    const ariaDisabled = element.getElementAttribute('aria-disabled') === 'true';
    return disabled || ariaDisabled;
  }

  /**
   * Returns true for a text-shadow large/blurry enough that it may affect the
   * effective contrast and therefore can't be judged automatically.
   *
   * Handles every comma-separated shadow layer (not just the first), shadows
   * given without a blur radius (e.g. "3px 3px"), and px/em/rem length units.
   * Colour functions such as rgba(...) — whose commas would otherwise split a
   * layer apart — are respected.
   *
   * @param textShadow - Computed text-shadow declaration.
   * @param fontSizePx - Computed font size used to resolve relative lengths.
   * @returns True when the shadow prevents reliable automatic contrast evaluation.
   */
  private hasDisqualifyingShadow(textShadow: string | null, fontSizePx: number): boolean {
    if (!textShadow) return false;
    const trimmed = textShadow.trim();
    if (trimmed === '' || trimmed === 'none') return false;

    for (const layer of this.splitShadowLayers(trimmed)) {
      const lengths = layer.split(/\s+/).filter((token) => /^-?(?:\d+(?:\.\d+)?|\.\d+)(?:px|rem|em)$/.test(token));
      // A valid shadow needs at least offset-x and offset-y; blur is optional.
      if (!lengths || lengths.length < 2) continue;

      const horizontal = Math.abs(this.shadowLengthToPx(lengths[0], fontSizePx));
      const vertical = Math.abs(this.shadowLengthToPx(lengths[1], fontSizePx));
      const blur = lengths[2] ? this.shadowLengthToPx(lengths[2], fontSizePx) : 0;

      if (blur > 0 || horizontal > 1 || vertical > 1) return true;
    }
    return false;
  }

  /**
   * Handles text that cannot paint its normal foreground. Element and
   * pseudo-element opacity apply to the complete group, including shadows. An
   * independently coloured shadow can still paint a transparent glyph, but
   * its effective contrast cannot be determined reliably here.
   *
   * @param test - Result object used when an alternative paint source requires a warning.
   * @param element - Element whose transparent foreground is evaluated.
   * @param foreground - Parsed normal foreground colour, if parseable.
   * @param effectiveOpacity - Combined element and rendered-text opacity.
   * @param textShadow - Computed text-shadow declaration.
   * @returns True when transparent-text handling completed applicability evaluation.
   */
  private handleTransparentText(
    test: Test,
    element: QWElement,
    foreground: RGBColor | undefined,
    effectiveOpacity: number,
    textShadow: string | null
  ): boolean {
    // Group opacity hides every paint source, including shadows and strokes.
    if (effectiveOpacity === 0) return true;
    if (foreground === undefined || foreground.alpha !== 0) return false;

    // The normal foreground cannot paint. Emit a warning only when another
    // known paint source can; otherwise the target is genuinely inapplicable.
    if (this.hasVisibleTextShadow(textShadow, foreground)) {
      this.emit(test, element, Verdict.WARNING, 'W1');
    } else if (this.hasAlternativeVisibleTextPaint(element)) {
      this.emit(test, element, Verdict.WARNING, 'W5');
    }
    return true;
  }

  /**
   * Transparent CSS `color` does not guarantee invisible glyphs. Text fill,
   * text stroke and a background clipped to the text can paint independently;
   * their pixel contrast needs manual verification.
   *
   * @param element - Element whose alternative text paint is inspected.
   * @returns True when a fill, stroke or clipped background can paint glyphs.
   */
  private hasAlternativeVisibleTextPaint(element: QWElement): boolean {
    // Chromium exposes these legacy-prefixed properties as computed styles;
    // when unset, text-fill resolves to the ordinary (transparent) `color`.
    const textFill = this.parseRGBString(element.getElementStyleProperty('-webkit-text-fill-color', null));
    if (textFill && textFill.alpha > 0) return true;

    const strokeWidth = parseFloat(element.getElementStyleProperty('-webkit-text-stroke-width', null));
    const strokeColor = this.parseRGBString(element.getElementStyleProperty('-webkit-text-stroke-color', null));
    if (strokeWidth > 0 && strokeColor && strokeColor.alpha > 0) return true;

    if (element.getElementStyleProperty('background-clip', null) !== 'text') return false;
    const backgroundImage = element.getElementStyleProperty('background-image', null);
    if (backgroundImage !== '' && backgroundImage !== 'none') return true;

    const backgroundColor = this.parseRGBString(element.getElementStyleProperty('background-color', null));
    return backgroundColor !== undefined && backgroundColor.alpha > 0;
  }

  /**
   * Returns true when at least one shadow layer can paint visible pixels. A
   * layer without an explicit colour uses the element's current text colour.
   *
   * @param textShadow - Computed text-shadow declaration.
   * @param currentColor - Parsed current text colour used by colourless shadow layers.
   * @returns True when at least one shadow layer has non-zero alpha.
   */
  private hasVisibleTextShadow(textShadow: string | null, currentColor: RGBColor): boolean {
    if (!textShadow) return false;
    const trimmed = textShadow.trim();
    if (trimmed === '' || trimmed === 'none') return false;

    return this.splitShadowLayers(trimmed).some((layer) => {
      const explicitColor = this.splitShadowComponents(layer)
        .map((component) => this.parseRGBString(component))
        .find((color): color is RGBColor => color !== undefined);
      return (explicitColor ?? currentColor).alpha > 0;
    });
  }

  /**
   * Split one shadow layer on whitespace outside colour functions.
   *
   * @param layer - One text-shadow layer.
   * @returns Top-level colour and length components.
   */
  private splitShadowComponents(layer: string): string[] {
    const components: string[] = [];
    let depth = 0;
    let current = '';

    for (const char of layer) {
      if (char === '(') depth++;
      else if (char === ')') depth = Math.max(0, depth - 1);

      if (/\s/.test(char) && depth === 0) {
        if (current) components.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    if (current) components.push(current);
    return components;
  }

  /**
   * Split a text-shadow value into layers on top-level commas only.
   *
   * @param value - Complete computed text-shadow declaration.
   * @returns Individual shadow layers in source order.
   */
  private splitShadowLayers(value: string): string[] {
    const layers: string[] = [];
    let depth = 0;
    let current = '';
    for (const char of value) {
      if (char === '(') depth++;
      else if (char === ')') depth = Math.max(0, depth - 1);

      if (char === ',' && depth === 0) {
        layers.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    if (current.trim()) layers.push(current.trim());
    return layers;
  }

  /**
   * Convert a px/em/rem length to pixels. Computed styles are usually already
   * in px; em uses the element font-size, while rem assumes a 16px root.
   *
   * @param length - CSS length using px, em or rem.
   * @param fontSizePx - Element font size used to resolve em units.
   * @returns Length expressed in CSS pixels.
   */
  private shadowLengthToPx(length: string, fontSizePx: number): number {
    const numeric = parseFloat(length);
    if (length.endsWith('rem')) return numeric * 16;
    if (length.endsWith('em')) return numeric * (Number.isFinite(fontSizePx) ? fontSizePx : 16);
    return numeric;
  }

  // ---------------------------------------------------------------------------
  // Background resolution
  // ---------------------------------------------------------------------------

  /**
   * Resolve rendered foreground/background pixels through ancestor layers.
   *
   * CSS opacity applies after an element and its descendants are composited as
   * a group. Carrying both accumulated colours upward preserves that ordering;
   * multiplying only the foreground alpha would produce incorrect contrast.
   *
   * @param element - Target element whose paint stack is resolved.
   * @param textColor - Parsed foreground colour before ancestor compositing.
   * @param targetBackground - Proven target-layer pixel used by gradient evaluation.
   * @returns Resolved opaque colours or a manual-review reason.
   */
  private resolveSolidColors(
    element: QWElement,
    textColor: RGBColor,
    targetBackground?: RGBColor
  ): BackgroundResolution {
    let background = { ...TRANSPARENT };
    let foreground = { ...textColor };
    let current: QWElement | null = element;
    let isTarget = true;

    while (current) {
      // Gradient evaluation supplies one proven pixel from the target layer.
      // Ancestor layers are still read normally so opacity/compositing remains
      // identical to the solid-background path.
      const layer = this.resolveBackgroundLayer(current, isTarget ? targetBackground : undefined);
      if (layer.kind === 'cantTell') return layer;
      const layerColor = layer.color;

      if (isTarget) {
        background = layerColor;
        foreground = this.compositeColors(foreground, layerColor);
        isTarget = false;
      } else {
        background = this.compositeColors(background, layerColor);
        foreground = this.compositeColors(foreground, layerColor);
      }

      const opacity = this.parseOpacity(current.getElementStyleProperty('opacity', null));
      background.alpha *= opacity;
      foreground.alpha *= opacity;
      current = current.getElementParent();
    }

    // The browser canvas is treated as opaque white when every authored layer
    // remains transparent, matching the rule's previous fallback behaviour.
    return {
      kind: 'color',
      background: this.compositeColors(background, WHITE),
      foreground: this.compositeColors(foreground, WHITE)
    };
  }

  /**
   * Resolve one background layer, preserving the reason when it cannot be automated.
   *
   * @param element - Element supplying the background layer.
   * @param suppliedColor - Proven replacement pixel for the target gradient layer.
   * @returns Solid layer colour or an image/gradient manual-review reason.
   */
  private resolveBackgroundLayer(element: QWElement, suppliedColor?: RGBColor): BackgroundLayerResolution {
    if (suppliedColor) return { kind: 'color', color: { ...suppliedColor } };

    const background = this.getBackground(element);
    if (this.isImage(background)) return { kind: 'cantTell', resultCode: 'W2' };
    if (this.isGradient(background)) return { kind: 'cantTell', resultCode: 'W3' };

    const color = this.parseRGBString(background);
    return color ? { kind: 'color', color } : { kind: 'cantTell', resultCode: 'W3' };
  }

  /**
   * Return the uppermost authored background source relevant to contrast.
   *
   * @param element - Element whose computed background is inspected.
   * @returns Background image when present, otherwise its colour/background value.
   */
  private getBackground(element: QWElement): string {
    // background-image paints above background-color. Returning it first forces
    // image/gradient handling instead of accidentally evaluating the colour
    // hidden underneath it.
    const bgImg = element.getElementStyleProperty('background-image', null);
    if (bgImg && bgImg !== 'none' && bgImg !== '') return bgImg;
    const bgColor = element.getElementStyleProperty('background-color', null);
    return bgColor && bgColor !== '' && bgColor !== 'transparent'
      ? bgColor
      : element.getElementStyleProperty('background', null);
  }

  /**
   * Return whether a CSS background value contains an image URL.
   *
   * @param background - Computed CSS background value.
   * @returns True when the value contains a supported image indicator or URL.
   */
  private isImage(background: string): boolean {
    const lower = background.toLowerCase();
    return lower.includes('.jpg') || lower.includes('.png') || lower.includes('.svg') || lower.includes('url(');
  }

  /**
   * Return whether a CSS background value contains any gradient function.
   *
   * @param background - Computed CSS background value.
   * @returns True when the value contains a CSS gradient function.
   */
  private isGradient(background: string): boolean {
    return background.toLowerCase().includes('gradient(');
  }

  /**
   * Parse and clamp CSS opacity, defaulting invalid or absent values to one.
   *
   * @param value - Computed opacity value.
   * @returns Normalised opacity in the range zero to one.
   */
  private parseOpacity(value: string | null): number {
    const opacity = parseFloat(value ?? '1');
    return Number.isFinite(opacity) ? Math.max(0, Math.min(1, opacity)) : 1;
  }

  /**
   * Evaluate image/gradient backgrounds.
   *
   * @param options - Element, paint and typography data required for evaluation.
   * @returns True when the background was non-solid and fully handled; false
   * when the caller should continue through the solid-colour path.
   */
  private evaluateNonSolidBackground(options: NonSolidEvaluation): boolean {
    if (this.isImage(options.background)) {
      this.emit(options.test, options.element, Verdict.WARNING, 'W2');
      return true;
    }
    if (!this.isGradient(options.background)) return false;

    if (!this.isHumanLanguage(options.text)) {
      this.emit(options.test, options.element, Verdict.PASSED, 'P2');
      return true;
    }

    const stops = this.parseSupportedGradient(options.background);
    // A definitive result is allowed only when every part of the simplified
    // paint model is known. Unsupported syntax or effects deliberately retain
    // the historic W3 manual-review outcome instead of guessing.
    if (
      !options.foreground ||
      options.foreground.alpha !== 1 ||
      options.pseudoOpacity !== 1 ||
      !stops ||
      !this.hasMonotonicRGBInterpolation(stops) ||
      !this.hasReliableGradientPaintStack(options.element)
    ) {
      this.emit(options.test, options.element, Verdict.WARNING, 'W3');
      return true;
    }

    if (this.hasVisibleTextShadow(options.textShadow, options.foreground)) {
      this.emit(options.test, options.element, Verdict.WARNING, 'W1');
      return true;
    }

    const interval = this.getGradientTextInterval(options.element);
    if (!interval) {
      this.emit(options.test, options.element, Verdict.WARNING, 'W3');
      return true;
    }

    const resolved: Array<{ background: RGBColor; foreground: RGBColor }> = [];
    // Monotonicity means the two horizontal endpoints bound every background
    // luminance under the text; sampling interior pixels is unnecessary.
    for (const ratio of interval) {
      const background = this.getColorInGradient(stops[0], stops[1], ratio);
      const colors = this.resolveSolidColors(options.element, options.foreground, background);
      if (colors.kind === 'cantTell') {
        this.emit(options.test, options.element, Verdict.WARNING, colors.resultCode);
        return true;
      }
      resolved.push(colors);
    }

    // Matching foreground/background pixels render no visible text and are
    // inapplicable (ACT Inapplicable Example 3), including a flat gradient.
    if (resolved.every((colors) => this.equals(colors.background, colors.foreground))) return true;

    const verdicts = resolved.map((colors) =>
      this.hasValidContrastRatio(
        this.getContrast(colors.background, colors.foreground),
        options.fontSize,
        this.isBold(options.fontWeight)
      )
    );

    // With component-wise monotonic sRGB interpolation, relative luminance is
    // monotonic. If both interval endpoints fail, no point under the text can
    // meet the threshold, so F2 is guaranteed.
    if (verdicts.every((verdict) => !verdict)) {
      this.emit(options.test, options.element, Verdict.FAILED, 'F2');
      return true;
    }

    // P3 is guaranteed only when the entire interval passes. Keeping both
    // endpoint backgrounds on the same side of the foreground luminance avoids
    // an internal contrast minimum where the gradient crosses the foreground.
    if (verdicts.every(Boolean) && this.isLuminanceIntervalOnOneSide(resolved)) {
      this.emit(options.test, options.element, Verdict.PASSED, 'P3');
      return true;
    }

    this.emit(options.test, options.element, Verdict.WARNING, 'W3');
    return true;
  }

  /**
   * Parses the deliberately narrow gradient shape supported for P3/F2.
   *
   * Stop positions, transparency, repeating gradients and other directions
   * change the mapping between layout coordinates and colour. They remain W3
   * until that mapping is modelled explicitly.
   *
   * @param gradient - Computed CSS gradient value.
   * @returns Two opaque endpoint colours when the supported syntax is proven.
   */
  private parseSupportedGradient(gradient: string): [RGBColor, RGBColor] | undefined {
    const trimmed = gradient.trim();
    if (!trimmed.toLowerCase().startsWith('linear-gradient(') || !trimmed.endsWith(')')) return undefined;

    const argumentsList = this.splitTopLevelCommaList(trimmed.slice(trimmed.indexOf('(') + 1, -1));
    if (argumentsList.length !== 3 || !['to right', '90deg'].includes(argumentsList[0].trim().toLowerCase())) {
      return undefined;
    }

    const from = this.parseRGBString(argumentsList[1].trim());
    const to = this.parseRGBString(argumentsList[2].trim());
    return from && to && from.alpha === 1 && to.alpha === 1 ? [from, to] : undefined;
  }

  /**
   * Split a CSS argument list without splitting commas inside colour functions.
   *
   * @param value - CSS function argument text.
   * @returns Top-level arguments in source order.
   */
  private splitTopLevelCommaList(value: string): string[] {
    const parts: string[] = [];
    let depth = 0;
    let current = '';

    for (const character of value) {
      if (character === '(') depth++;
      else if (character === ')') depth = Math.max(0, depth - 1);

      if (character === ',' && depth === 0) {
        parts.push(current.trim());
        current = '';
      } else {
        current += character;
      }
    }
    if (current.trim() !== '') parts.push(current.trim());
    return parts;
  }

  /**
   * Component-wise monotonic sRGB interpolation also has monotonic relative
   * luminance. Mixed channel directions need fuller colour-space analysis and
   * therefore remain manual-review cases.
   *
   * @param colors - Gradient endpoint colours.
   * @returns True when all sRGB channels move in the same direction.
   */
  private hasMonotonicRGBInterpolation(colors: [RGBColor, RGBColor]): boolean {
    const deltas = [
      colors[1].red - colors[0].red,
      colors[1].green - colors[0].green,
      colors[1].blue - colors[0].blue
    ];
    return deltas.every((delta) => delta >= 0) || deltas.every((delta) => delta <= 0);
  }

  /**
   * Returns the horizontal gradient interval that can contain painted text.
   * Text-node ranges give the actual layout position, including alignment,
   * indentation and wrapping. Form-control text has no DOM range, so the whole
   * padding box is used as a safe superset.
   *
   * @param element - Element whose gradient and text geometry are mapped.
   * @returns Normalised horizontal text interval, or undefined when not provable.
   */
  private getGradientTextInterval(element: QWElement): [number, number] | undefined {
    // These computed defaults make the gradient line match the padding box.
    // Any author override changes the geometry and therefore invalidates the
    // simple ratio calculation below.
    if (element.getElementStyleProperty('background-origin', null) !== 'padding-box') return undefined;
    if (!['auto', 'auto auto'].includes(element.getElementStyleProperty('background-size', null))) return undefined;
    if (element.getElementStyleProperty('background-clip', null) !== 'border-box') return undefined;
    if (element.getElementStyleProperty('background-blend-mode', null) !== 'normal') return undefined;
    if (element.getElementStyleProperty('background-attachment', null) !== 'scroll') return undefined;
    if (element.getElementStyleProperty('display', null) === 'inline') return undefined;

    const box = element.getBoundingBox();
    const borderLeft = parseFloat(element.getElementStyleProperty('border-left-width', null));
    const borderRight = parseFloat(element.getElementStyleProperty('border-right-width', null));
    if (![box.left, box.right, box.width, borderLeft, borderRight].every(Number.isFinite)) return undefined;

    const gradientLeft = box.left + borderLeft;
    const gradientRight = box.right - borderRight;
    const gradientWidth = gradientRight - gradientLeft;
    if (gradientWidth <= 0) return undefined;

    const textRects = (element.getChildrenTextNodes() ?? [])
      .map((node) => node.getBoundingBox())
      .filter((rect): rect is DOMRect => rect !== null);

    // Rendered form values and placeholders have no text node. The complete
    // positioning area is conservative: it can only turn a mixed case into W3.
    if (textRects.length === 0) return [0, 1];

    const textLeft = Math.min(...textRects.map((rect) => rect.left));
    const textRight = Math.max(...textRects.map((rect) => rect.right));
    const tolerance = 0.5;
    if (textLeft < gradientLeft - tolerance || textRight > gradientRight + tolerance) return undefined;

    return [
      Math.max(0, Math.min(1, (textLeft - gradientLeft) / gradientWidth)),
      Math.max(0, Math.min(1, (textRight - gradientLeft) / gradientWidth))
    ];
  }

  /**
   * Reject paint effects that invalidate the affine colour/geometry model.
   * Returning false here never creates a pass or failure; it falls back to W3.
   *
   * @param element - Gradient target whose paint stack is inspected.
   * @returns True when no unsupported paint or overlap can affect the proof.
   */
  private hasReliableGradientPaintStack(element: QWElement): boolean {
    // Descendants may paint between the gradient and the target text. Their
    // stacking and transparency are intentionally outside this proof.
    if (element.elementHasChildren() || this.hasPotentiallyOverlappingSibling(element)) return false;

    let current: QWElement | null = element;
    while (current) {
      if (this.hasUnsupportedPaintEffect(current) || this.hasGeneratedContentLayer(current)) return false;
      current = current.getElementParent();
    }
    return true;
  }

  /**
   * Return whether an element applies effects outside the gradient model.
   *
   * @param element - Target or ancestor whose computed paint styles are inspected.
   * @returns True when opacity, transforms, filters, blending or zoom are unsupported.
   */
  private hasUnsupportedPaintEffect(element: QWElement): boolean {
    const expectedStyles: Array<[string, string]> = [
      ['transform', 'none'],
      ['filter', 'none'],
      ['backdrop-filter', 'none'],
      ['mix-blend-mode', 'normal']
    ];
    const hasUnexpectedStyle = expectedStyles.some(
      ([property, expected]) => element.getElementStyleProperty(property, null) !== expected
    );
    const zoom = parseFloat(element.getElementStyleProperty('zoom', null));
    const hasZoom = Number.isFinite(zoom) && zoom !== 1;
    return this.parseOpacity(element.getElementStyleProperty('opacity', null)) !== 1 || hasUnexpectedStyle || hasZoom;
  }

  /**
   * Return whether either generated pseudo-element can contribute painted content.
   *
   * @param element - Element whose generated content is inspected.
   * @returns True when ::before or ::after has a non-empty content value.
   */
  private hasGeneratedContentLayer(element: QWElement): boolean {
    return ['::before', '::after'].some((pseudo) =>
      this.hasGeneratedContent(element, pseudo as '::before' | '::after')
    );
  }

  /**
   * Return whether one generated pseudo-element has non-empty computed content.
   *
   * @param element - Element owning the pseudo-element.
   * @param pseudo - Generated pseudo-element to inspect.
   * @returns True when the pseudo-element may contribute painted content.
   */
  private hasGeneratedContent(element: QWElement, pseudo: '::before' | '::after'): boolean {
    const content = element.getElementStyleProperty('content', pseudo).trim().toLowerCase();
    return content !== '' && content !== 'none' && content !== 'normal';
  }

  /**
   * Overlapping siblings can replace the background pixels under the text.
   * Rejecting any overlap is conservative with respect to stacking order, but
   * prevents a definitive result when that order has not been modelled.
   *
   * @param element - Gradient target whose sibling geometry is inspected.
   * @returns True when a sibling at any ancestor level intersects the target.
   */
  private hasPotentiallyOverlappingSibling(element: QWElement): boolean {
    const target = element.getBoundingBox();
    let current: QWElement | null = element;
    let parent = current.getElementParent();

    while (parent) {
      const currentSelector = current.getElementSelector();
      for (const sibling of parent.getElementChildren()) {
        if (sibling.getElementSelector() === currentSelector) continue;
        if (this.rectanglesOverlap(target, sibling.getBoundingBox())) return true;
      }
      current = parent;
      parent = current.getElementParent();
    }
    return false;
  }

  /**
   * Return whether two non-empty layout rectangles have a positive-area intersection.
   *
   * @param first - Target rectangle.
   * @param second - Potentially overlapping rectangle.
   * @returns True when both axes overlap by a positive amount.
   */
  private rectanglesOverlap(first: DOMRect, second: DOMRect): boolean {
    if (second.width <= 0 || second.height <= 0) return false;
    const intersectsHorizontally = first.left < second.right && first.right > second.left;
    const intersectsVertically = first.top < second.bottom && first.bottom > second.top;
    return intersectsHorizontally && intersectsVertically;
  }

  /**
   * Return whether all endpoint backgrounds lie on one side of foreground luminance.
   *
   * @param colors - Resolved foreground/background pairs at interval endpoints.
   * @returns True when the interval cannot cross the foreground luminance.
   */
  private isLuminanceIntervalOnOneSide(
    colors: Array<{ background: RGBColor; foreground: RGBColor }>
  ): boolean {
    const differences = colors.map(
      ({ background, foreground }) => this.getLuminance(background) - this.getLuminance(foreground)
    );
    return differences.every((difference) => difference >= 0) || differences.every((difference) => difference <= 0);
  }

  /**
   * Interpolate one sRGB colour at a normalised horizontal gradient position.
   *
   * @param from - Gradient start colour.
   * @param to - Gradient end colour.
   * @param ratio - Normalised horizontal position from zero to one.
   * @returns Interpolated sRGB colour.
   */
  private getColorInGradient(from: RGBColor, to: RGBColor, ratio: number): RGBColor {
    return {
      red: from.red + (to.red - from.red) * ratio,
      green: from.green + (to.green - from.green) * ratio,
      blue: from.blue + (to.blue - from.blue) * ratio,
      alpha: from.alpha + (to.alpha - from.alpha) * ratio
    };
  }

  // ---------------------------------------------------------------------------
  // Colour maths
  // ---------------------------------------------------------------------------

  /**
   * Parse a CSS colour into unpremultiplied sRGB channels and alpha.
   *
   * @param colorString - Computed CSS colour value.
   * @returns Parsed sRGB colour, transparent fallback, or undefined on failure.
   */
  private parseRGBString(colorString: string): RGBColor | undefined {
    if (!colorString || colorString === 'transparent' || colorString === 'none') {
      return { red: 0, green: 0, blue: 0, alpha: 0 };
    }

    try {
      // colorjs normalises modern CSS colour syntaxes to the sRGB space used by
      // WCAG relative-luminance and contrast calculations below.
      const srgb = new Color(colorString).to('srgb');
      return {
        red: srgb.coords[0] * 255,
        green: srgb.coords[1] * 255,
        blue: srgb.coords[2] * 255,
        alpha: Number(srgb.alpha ?? 1)
      };
    } catch {
      return undefined;
    }
  }

  /**
   * Composite foreground over background using the source-over operation.
   *
   * @param fg - Foreground colour.
   * @param bg - Background colour.
   * @returns Source-over composite with unpremultiplied channels.
   */
  private compositeColors(fg: RGBColor, bg: RGBColor): RGBColor {
    // Standard source-over alpha compositing. Channels stay unpremultiplied in
    // RGBColor, hence the division by the resulting alpha.
    const alpha = fg.alpha + bg.alpha * (1 - fg.alpha);
    if (alpha === 0) return { ...TRANSPARENT };
    return {
      red: (fg.red * fg.alpha + bg.red * bg.alpha * (1 - fg.alpha)) / alpha,
      green: (fg.green * fg.alpha + bg.green * bg.alpha * (1 - fg.alpha)) / alpha,
      blue: (fg.blue * fg.alpha + bg.blue * bg.alpha * (1 - fg.alpha)) / alpha,
      alpha
    };
  }

  /**
   * Calculate the WCAG contrast ratio after compositing translucent foreground.
   *
   * @param bg - Resolved background colour.
   * @param fg - Resolved foreground colour.
   * @returns Unrounded WCAG contrast ratio.
   */
  private getContrast(bg: RGBColor, fg: RGBColor): number {
    const finalFG = fg.alpha < 1 ? this.compositeColors(fg, bg) : fg;
    const L1 = this.getLuminance(bg);
    const L2 = this.getLuminance(finalFG);
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  }

  /**
   * Calculate WCAG relative luminance for an sRGB colour.
   *
   * @param c - sRGB colour whose luminance is required.
   * @returns Relative luminance in the range zero to one.
   */
  private getLuminance(c: RGBColor): number {
    const [r, g, b] = [c.red, c.green, c.blue].map((value) => {
      const v = value / 255;
      return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return r * 0.2126 + g * 0.7152 + b * 0.0722;
  }

  /**
   * Apply the exact WCAG 1.4.3 threshold for normal or large text.
   *
   * @param contrast - Unrounded contrast ratio.
   * @param fontSize - Computed font size in CSS pixels.
   * @param isBold - Whether the computed font weight meets the bold threshold.
   * @returns True when the applicable 3:1 or 4.5:1 threshold is met.
   */
  private hasValidContrastRatio(contrast: number, fontSize: string, isBold: boolean): boolean {
    const size = parseFloat(fontSize);
    // Computed font sizes are CSS pixels. 14pt and 18pt are converted once in
    // the constants above; compare the unrounded ratio to the exact threshold.
    const threshold = (isBold && size >= LARGE_BOLD_TEXT_PX) || size >= LARGE_TEXT_PX ? 3 : 4.5;
    return contrast >= threshold;
  }

  /**
   * Return whether a computed font weight meets the WCAG bold threshold.
   *
   * @param fontWeight - Computed numeric or keyword font weight.
   * @returns True for weights of at least 700 or equivalent bold keywords.
   */
  private isBold(fontWeight: string): boolean {
    const numericWeight = Number.parseFloat(fontWeight);
    return Number.isFinite(numericWeight) ? numericWeight >= 700 : ['bold', 'bolder'].includes(fontWeight);
  }

  /**
   * Compare two resolved colours without rounding their channels.
   *
   * @param c1 - First resolved colour.
   * @param c2 - Second resolved colour.
   * @returns True when all channels and alpha are exactly equal.
   */
  private equals(c1: RGBColor, c2: RGBColor): boolean {
    return c1.red === c2.red && c1.green === c2.green && c1.blue === c2.blue && c1.alpha === c2.alpha;
  }

  // ---------------------------------------------------------------------------
  // DomUtils passthroughs
  // ---------------------------------------------------------------------------

  /**
   * Delegate QualWeb's existing human-language heuristic.
   *
   * @param text - Rendered text to classify.
   * @returns True when the text is considered human language.
   */
  private isHumanLanguage(text: string): boolean {
    return window.DomUtils.isHumanLanguage(text);
  }

  // ---------------------------------------------------------------------------
  // Result emission
  // ---------------------------------------------------------------------------

  /**
   * Finalise and register one applicable result for the candidate element.
   *
   * @param test - Mutable rule result to finalise.
   * @param element - Element associated with the result.
   * @param verdict - Passed, failed or warning verdict.
   * @param resultCode - Localised result-code key.
   */
  private emit(test: Test, element: QWElement, verdict: Verdict, resultCode: string): void {
    // Returning from execute without calling emit is how AtomicRule represents
    // an inapplicable target; every emitted Test is therefore a real outcome.
    test.verdict = verdict;
    test.resultCode = resultCode;
    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_ACT_R37 };
