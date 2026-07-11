import type { QWElement } from '@qualweb/qw-element';
import {
  ElementExists,
  ElementIsHTMLElement,
  ElementIsNot,
  ElementIsVisible
} from '@qualweb/util/applicability';
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
  | { kind: 'color'; color: RGBColor }
  | { kind: 'cantTell'; resultCode: 'W2' | 'W3' };

const WHITE: RGBColor = { red: 255, green: 255, blue: 255, alpha: 1 };
const INPUT_TAGS = ['input', 'select', 'textarea'];
const GRADIENT_REGEX = /((\w-?)*gradient.*)/gm;

/**
 * QW-ACT-R37 — text has sufficient colour contrast.
 *
 * This is a structural refactor of the rule: the verdict semantics
 * (P1-P3 / F1-F2 / W1-W3) are preserved exactly. Only flow decomposition,
 * the disabled-widget lookup (now a memoised Set), typing and a few defensive
 * guards have changed.
 */
class QW_ACT_R37 extends AtomicRule {
  /** Memoised disabled-widget selectors, keyed on the source array identity. */
  private disabledSelectorCache?: { source: unknown; selectors: Set<string> };

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

    // Excluded if the element (or one of its children) belongs to a disabled widget.
    const elementSelector = element.getElementSelector();
    if (this.getDisabledSelectors(window.disabledWidgets).has(elementSelector)) return;

    // Excluded if the element is a disabled group.
    if (this.isDisabledGroup(element)) return;

    const fgColor = element.getElementStyleProperty('color', null);
    const bgColor = this.getBackground(element);
    const opacity = parseFloat(element.getElementStyleProperty('opacity', null) || '1');
    const fontSize = element.getElementStyleProperty('font-size', null);
    const fontWeight = element.getElementStyleProperty('font-weight', null);
    const fontFamily = element.getElementStyleProperty('font-family', null);
    const fontStyle = element.getElementStyleProperty('font-style', null);
    const textShadow = element.getElementStyleProperty('text-shadow', null);

    const test = new Test();

    // Text shadow that could obscure contrast → cannot be evaluated automatically.
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

    // Solid background.
    const background = this.resolveSolidBackground(element, opacity);
    if (background.kind === 'cantTell') {
      this.emit(test, element, Verdict.WARNING, background.resultCode);
      return;
    }
    const parsedBG = background.color;

    const parsedFG = this.parseRGBString(fgColor);
    // NOTE: if the foreground colour can't be parsed, no result is emitted —
    // kept as-is to avoid inventing a result code without a matching i18n entry.
    if (!parsedFG) return;
    parsedFG.alpha *= opacity;

    // NOTE: when fg === bg (contrast 1:1) the original rule emits no result.
    // Preserved intentionally; flip to an explicit F1 here if that contract
    // should change.
    if (this.equals(parsedBG, parsedFG)) return;

    const textToVerify = elementText || placeholder || '';
    if (!this.isHumanLanguage(textToVerify)) {
      this.emit(test, element, Verdict.PASSED, 'P2');
      return;
    }

    const contrastRatio = this.getContrast(parsedBG, parsedFG);
    const isValid = this.hasValidContrastRatio(contrastRatio, fontSize, this.isBold(fontWeight));
    this.emit(test, element, isValid ? Verdict.PASSED : Verdict.FAILED, isValid ? 'P1' : 'F1');
  }

  // ---------------------------------------------------------------------------
  // Applicability helpers
  // ---------------------------------------------------------------------------

  /**
   * Collects every selector that should be treated as "inside a disabled widget":
   * the widget's accessible-name selector(s), its own selector, and its children's.
   * Memoised on the identity of the source array so the expensive
   * getAccessibleNameSelector call runs once per evaluation rather than per element.
   */
  private getDisabledSelectors(widgets: QWElement[] | undefined): Set<string> {
    const cache = this.disabledSelectorCache;
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

      selectors.add(widget.getElementSelector());
      for (const child of widget.getElementChildren() ?? []) {
        selectors.add(child.getElementSelector());
      }
    }

    this.disabledSelectorCache = { source: widgets, selectors };
    return selectors;
  }

  private isDisabledGroup(element: QWElement): boolean {
    if (window.AccessibilityUtils.getElementRole(element) !== 'group') return false;
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
   */
  private hasDisqualifyingShadow(textShadow: string | null, fontSizePx: number): boolean {
    if (!textShadow) return false;
    const trimmed = textShadow.trim();
    if (trimmed === '' || trimmed === 'none') return false;

    for (const layer of this.splitShadowLayers(trimmed)) {
      const lengths = layer.match(/-?\d*\.?\d+(px|rem|em)/g);
      // A valid shadow needs at least offset-x and offset-y; blur is optional.
      if (!lengths || lengths.length < 2) continue;

      const horizontal = Math.abs(this.shadowLengthToPx(lengths[0], fontSizePx));
      const vertical = Math.abs(this.shadowLengthToPx(lengths[1], fontSizePx));
      const blur = lengths[2] ? this.shadowLengthToPx(lengths[2], fontSizePx) : 0;

      if (blur > 0 || horizontal > 1 || vertical > 1) return true;
    }
    return false;
  }

  /** Splits a text-shadow value into layers on top-level commas only. */
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

  /** Converts a px/em/rem length to pixels. Computed styles are usually already
   *  in px; em uses the element font-size, rem assumes a 16px root. */
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
   * Resolves a solid (non-gradient, non-image) background for the element,
   * walking up the ancestor chain through fully-transparent backgrounds and
   * flattening any remaining alpha onto white.
   *
   * If an ancestor along the way has an image or gradient background, a solid
   * colour can't be composed, so the result is "cantTell" (W2 / W3) rather than
   * silently skipping past it onto a wrong colour.
   */
  private resolveSolidBackground(element: QWElement, opacity: number): BackgroundResolution {
    // The element's own gradient/image background is handled before this point,
    // so its background here is either a solid colour or transparent.
    let parsed = this.parseRGBString(this.getBackground(element));
    if (parsed) parsed.alpha *= opacity;

    let current = element;
    while (!parsed || this.isFullyTransparent(parsed)) {
      const parent = current.getElementParent();
      if (!parent) break;

      const parentBg = this.getBackground(parent);
      if (this.isImage(parentBg)) return { kind: 'cantTell', resultCode: 'W2' };
      if (parentBg.match(GRADIENT_REGEX)) return { kind: 'cantTell', resultCode: 'W3' };

      const parentOpacity = parseFloat(parent.getElementStyleProperty('opacity', null) || '1');
      parsed = this.parseRGBString(parentBg);
      if (parsed) parsed.alpha *= parentOpacity;
      current = parent;
    }

    if (!parsed || parsed.alpha === 0) {
      parsed = { ...WHITE };
    }
    if (parsed.alpha < 1) {
      parsed = this.flattenColors(parsed, WHITE);
    }
    return { kind: 'color', color: parsed };
  }

  private getBackground(element: QWElement): string {
    const bgImg = element.getElementStyleProperty('background-image', null);
    if (bgImg && bgImg !== 'none' && bgImg !== '') return bgImg;
    const bgColor = element.getElementStyleProperty('background-color', null);
    return bgColor && bgColor !== '' && bgColor !== 'transparent'
      ? bgColor
      : element.getElementStyleProperty('background', null);
  }

  private isImage(background: string): boolean {
    const lower = background.toLowerCase();
    return lower.includes('.jpg') || lower.includes('.png') || lower.includes('.svg') || lower.includes('url(');
  }

  // ---------------------------------------------------------------------------
  // Gradient evaluation
  // ---------------------------------------------------------------------------

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
  // Colour maths
  // ---------------------------------------------------------------------------

  private parseRGBString(colorString: string): RGBColor | undefined {
    if (!colorString || colorString === 'transparent' || colorString === 'none') {
      return { red: 0, green: 0, blue: 0, alpha: 0 };
    }

    const rgb = colorString.match(/^rgb\((\d+), (\d+), (\d+)\)/);
    if (rgb) {
      return { red: parseInt(rgb[1], 10), green: parseInt(rgb[2], 10), blue: parseInt(rgb[3], 10), alpha: 1.0 };
    }

    const rgba = colorString.match(/^rgba\((\d+), (\d+), (\d+), (\d*(\.\d+)?)\)/);
    if (rgba) {
      return {
        red: parseInt(rgba[1], 10),
        green: parseInt(rgba[2], 10),
        blue: parseInt(rgba[3], 10),
        alpha: Math.round(parseFloat(rgba[4]) * 100) / 100
      };
    }

    try {
      const srgb = new Color(colorString).to('srgb');
      return {
        red: Math.round(srgb.coords[0] * 255),
        green: Math.round(srgb.coords[1] * 255),
        blue: Math.round(srgb.coords[2] * 255),
        alpha: srgb.alpha ?? 1
      };
    } catch {
      return undefined;
    }
  }

  private flattenColors(fg: RGBColor, bg: RGBColor): RGBColor {
    const alpha = fg.alpha;
    return {
      red: Math.round((1 - alpha) * bg.red + alpha * fg.red),
      green: Math.round((1 - alpha) * bg.green + alpha * fg.green),
      blue: Math.round((1 - alpha) * bg.blue + alpha * fg.blue),
      alpha: fg.alpha + bg.alpha * (1 - fg.alpha)
    };
  }

  private getContrast(bg: RGBColor, fg: RGBColor): number {
    const finalFG = fg.alpha < 1 ? this.flattenColors(fg, bg) : fg;
    const L1 = this.getLuminance(bg);
    const L2 = this.getLuminance(finalFG);
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  }

  private getLuminance(c: RGBColor): number {
    const [r, g, b] = [c.red, c.green, c.blue].map((value) => {
      const v = value / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return r * 0.2126 + g * 0.7152 + b * 0.0722;
  }

  private hasValidContrastRatio(contrast: number, fontSize: string, isBold: boolean): boolean {
    const size = parseFloat(fontSize);
    const threshold = (isBold && size >= 18.66) || size >= 24 ? 3 : 4.5;
    return contrast + 0.02 >= threshold;
  }

  private isBold(fontWeight: string): boolean {
    return !!fontWeight && ['bold', 'bolder', '700', '800', '900'].includes(fontWeight);
  }

  private equals(c1: RGBColor, c2: RGBColor): boolean {
    return c1.red === c2.red && c1.green === c2.green && c1.blue === c2.blue && c1.alpha === c2.alpha;
  }

  private isFullyTransparent(c: RGBColor): boolean {
    return c.red === 0 && c.green === 0 && c.blue === 0 && c.alpha === 0;
  }

  // ---------------------------------------------------------------------------
  // DomUtils passthroughs
  // ---------------------------------------------------------------------------

  private isHumanLanguage(text: string): boolean {
    return window.DomUtils.isHumanLanguage(text);
  }

  private getTextSize(font: string, fontSize: number, bold: boolean, italic: boolean, text: string): number {
    return window.DomUtils.getTextSize(font, fontSize, bold, italic, text);
  }

  // ---------------------------------------------------------------------------
  // Result emission
  // ---------------------------------------------------------------------------

  private emit(test: Test, element: QWElement, verdict: Verdict, resultCode: string): void {
    test.verdict = verdict;
    test.resultCode = resultCode;
    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_ACT_R37 };