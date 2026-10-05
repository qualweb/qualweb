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
const INPUT_TAGS = ['input', 'select', 'textarea'];
const GRADIENT_REGEX = /((\w-?)*gradient.*)/gm;

/**
 * Resolve solid text contrast through ancestor backgrounds and opacity groups.
 * Gradient evaluation and form-control targeting use separate paths.
 */
class QW_ACT_R37 extends AtomicRule {
  private disabledLabelCache?: { source: unknown; selectors: Set<string> };

  @ElementExists
  @ElementIsHTMLElement
  @ElementIsNot(['html', 'head', 'body', 'script', 'style', 'meta'])
  @ElementIsVisible
  execute(element: QWElement): void {
    if (!window.DomUtils.isElementVisible(element)) return;

    const nodeName = element.getElementTagName();
    const isInputField = INPUT_TAGS.includes(nodeName);
    const elementText = element.getElementOwnText().trim();
    const placeholder = element.getElementAttribute('placeholder')?.trim();

    // Not applicable: no own text, not a form field, no placeholder.
    if (elementText === '' && !isInputField && !placeholder) return;

    if (!element.isElementHTMLElement()) return;

    if (this.hasDisabledAncestorOrLabel(element, window.disabledWidgets)) return;

    const fgColor = element.getElementStyleProperty('color', null);
    const bgColor = this.getBackground(element);
    const opacity = this.parseOpacity(element.getElementStyleProperty('opacity', null));
    const fontSize = element.getElementStyleProperty('font-size', null);
    const fontWeight = element.getElementStyleProperty('font-weight', null);
    const fontFamily = element.getElementStyleProperty('font-family', null);
    const fontStyle = element.getElementStyleProperty('font-style', null);
    const textShadow = element.getElementStyleProperty('text-shadow', null);

    const test = new Test();

    const parsedFG = this.parseRGBString(fgColor);
    if (this.handleTransparentText(test, element, parsedFG, opacity, textShadow)) return;
    if (this.hasDisqualifyingShadow(textShadow, parseFloat(fontSize))) {
      this.emit(test, element, Verdict.WARNING, 'W1');
      return;
    }

    // Image background → cannot be evaluated automatically.
    if (this.isImage(bgColor)) {
      this.emit(test, element, Verdict.WARNING, 'W2');
      return;
    }

    // Gradient background.
    const gradientMatch = bgColor.match(GRADIENT_REGEX);
    if (gradientMatch) {
      const text = elementText || placeholder || '';
      if (this.isHumanLanguage(text)) {
        this.evaluateGradient(test, element, gradientMatch[0], fgColor, opacity, fontSize, fontWeight, fontStyle, fontFamily, text);
      } else {
        this.emit(test, element, Verdict.PASSED, 'P2');
      }
      return;
    }

    if (!parsedFG) return;
    const colors = this.resolveSolidColors(element, parsedFG);
    if (colors.kind === 'cantTell') {
      this.emit(test, element, Verdict.WARNING, colors.resultCode);
      return;
    }
    // Text that changes no rendered pixels is outside ACT applicability.
    if (this.equals(colors.background, colors.foreground)) {
      // Matching normal foreground pixels do not hide independent glyph paint.
      this.warnForIndependentTextPaint(test, element, parsedFG, textShadow);
      return;
    }

    const textToVerify = elementText || placeholder || '';
    if (!this.isHumanLanguage(textToVerify)) {
      this.emit(test, element, Verdict.PASSED, 'P2');
      return;
    }

    const contrastRatio = this.getContrast(colors.background, colors.foreground);
    const isValid = this.hasValidContrastRatio(contrastRatio, fontSize, this.isBold(fontWeight));
    this.emit(test, element, isValid ? Verdict.PASSED : Verdict.FAILED, isValid ? 'P1' : 'F1');
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
    this.warnForIndependentTextPaint(test, element, foreground, textShadow);
    return true;
  }

  private warnForIndependentTextPaint(
    test: Test,
    element: QWElement,
    foreground: RGBColor,
    textShadow: string | null
  ): void {
    if (this.hasVisibleTextShadow(textShadow, foreground)) {
      this.emit(test, element, Verdict.WARNING, 'W1');
    } else if (this.hasAlternativeVisibleTextPaint(element, foreground)) {
      this.emit(test, element, Verdict.WARNING, 'W5');
    }
  }

  /**
   * Transparent CSS `color` does not guarantee invisible glyphs. Text fill,
   * text stroke and a background clipped to the text can paint independently;
   * their pixel contrast needs manual verification.
   *
   * @param element - Element whose alternative text paint is inspected.
   * @param normalForeground - Ordinary text colour, used to ignore its default fill.
   * @returns True when a fill, stroke or clipped background can paint glyphs.
   */
  private hasAlternativeVisibleTextPaint(element: QWElement, normalForeground?: RGBColor): boolean {
    // Chromium exposes these legacy-prefixed properties as computed styles;
    // when unset, text-fill resolves to the ordinary (transparent) `color`.
    const textFill = this.parseRGBString(element.getElementStyleProperty('-webkit-text-fill-color', null));
    if (textFill && textFill.alpha > 0 && (!normalForeground || !this.equals(textFill, normalForeground))) return true;

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
   * @returns Resolved opaque colours or a manual-review reason.
   */
  private resolveSolidColors(
    element: QWElement,
    textColor: RGBColor
  ): BackgroundResolution {
    let background = { ...TRANSPARENT };
    let foreground = { ...textColor };
    let current: QWElement | null = element;
    let isTarget = true;

    while (current) {
      // Opaque descendant pixels hide this ancestor's background. Its opacity
      // still applies to the accumulated group and can expose later layers.
      const layer: BackgroundLayerResolution = background.alpha === 1 && foreground.alpha === 1
        ? { kind: 'color', color: TRANSPARENT }
        : this.resolveBackgroundLayer(current);
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
   * @returns Solid layer colour or an image/gradient manual-review reason.
   */
  private resolveBackgroundLayer(element: QWElement): BackgroundLayerResolution {
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

  private evaluateGradient(
    test: Test,
    element: QWElement,
    parsedGradientString: string,
    fgColor: string,
    opacity: number,
    fontSize: string,
    fontWeight: string,
    fontStyle: string,
    fontFamily: string,
    elementText: string
  ): void {
    // Non-linear gradients aren't supported → warn.
    if (!parsedGradientString.startsWith('linear-gradient')) {
      this.emit(test, element, Verdict.WARNING, 'W3');
      return;
    }

    const colors = this.parseGradientString(parsedGradientString);
    // Guard against an unparseable stop list (otherwise: crash on the
    // text-size branch, or a false PASSED from an empty stop loop).
    if (colors.length === 0) {
      this.emit(test, element, Verdict.WARNING, 'W3');
      return;
    }

    const parsedFG = this.parseRGBString(fgColor);
    if (!parsedFG) {
      this.emit(test, element, Verdict.WARNING, 'W3');
      return;
    }
    parsedFG.alpha *= opacity;

    const bold = this.isBold(fontWeight);
    const stopsToCheck = this.gradientStopsToCheck(element, colors, fontSize, fontWeight, fontStyle, fontFamily, elementText);

    const isValid = stopsToCheck.every((stop) =>
      this.hasValidContrastRatio(this.getContrast(stop, parsedFG), fontSize, bold)
    );

    this.emit(test, element, isValid ? Verdict.PASSED : Verdict.FAILED, isValid ? 'P3' : 'F2');
  }

  /**
   * Picks the gradient stops to test against. When the rendered text width can
   * be determined we only need the start stop and the colour under the last
   * character; otherwise we fall back to every parsed stop.
   */
  private gradientStopsToCheck(
    element: QWElement,
    colors: RGBColor[],
    fontSize: string,
    fontWeight: string,
    fontStyle: string,
    fontFamily: string,
    elementText: string
  ): RGBColor[] {
    const textSize = this.getTextSize(
      fontFamily.toLowerCase().replace(/['"]+/g, ''),
      parseInt(fontSize.replace('px', ''), 10),
      this.isBold(fontWeight),
      fontStyle.toLowerCase().includes('italic'),
      elementText
    );

    const elementWidth = parseInt((element.getElementStyleProperty('width', null) ?? '').replace('px', ''), 10);

    if (textSize !== -1 && Number.isFinite(elementWidth) && elementWidth > 0) {
      const lastCharRatio = textSize / elementWidth;
      const lastCharColor = this.getColorInGradient(colors[0], colors[colors.length - 1], lastCharRatio);
      return [colors[0], lastCharColor];
    }
    return colors;
  }

  private parseGradientString(gradient: string): RGBColor[] {
    const regex = /rgb(a?)\((\d+), (\d+), (\d+)+(, +(\d)+)?\)/gm;
    const matches = gradient.match(regex) ?? [];
    const colors: RGBColor[] = [];
    for (const stringColor of matches) {
      const parsed = this.parseRGBString(stringColor);
      if (parsed) colors.push(parsed);
    }
    return colors;
  }

  private getColorInGradient(fromColor: RGBColor, toColor: RGBColor, ratio: number): RGBColor {
    // Clamp so an oversized last-char position can't extrapolate past the stops.
    const r = Math.max(0, Math.min(1, ratio));
    return {
      red: fromColor.red + (toColor.red - fromColor.red) * r,
      green: fromColor.green + (toColor.green - fromColor.green) * r,
      blue: fromColor.blue + (toColor.blue - fromColor.blue) * r,
      alpha: 1
    };
  }

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

  private getTextSize(font: string, fontSize: number, bold: boolean, italic: boolean, text: string): number {
    return window.DomUtils.getTextSize(font, fontSize, bold, italic, text);
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
