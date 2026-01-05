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

class QW_ACT_R37 extends AtomicRule {
  @ElementExists
  @ElementIsHTMLElement
  @ElementIsNot(['html', 'head', 'body', 'script', 'style', 'meta'])
  @ElementIsVisible
  execute(element: QWElement): void {
    const visible = window.DomUtils.isElementVisible(element);
    if (!visible) return;

    const nodeName = element.getElementTagName();
    const isInputField = ['input', 'select', 'textarea'].includes(nodeName);
    const elementText = element.getElementOwnText().trim();
    const placeholder = element.getElementAttribute('placeholder')?.trim();

    if (elementText === '' && !isInputField && !placeholder) {
      return;
    }

    if (!element.isElementHTMLElement()) return;

    const disabledWidgets = window.disabledWidgets;
    const elementSelectors = element.getElementSelector();
    for (const disableWidget of disabledWidgets || []) {
      const selectorsResult: any = window.AccessibilityUtils.getAccessibleNameSelector(disableWidget);
      const selectors = typeof selectorsResult === 'string' ? [selectorsResult] : selectorsResult;
      
      if (disableWidget && selectors && selectors.includes(elementSelectors)) return;
      if (disableWidget.getElementSelector() === elementSelectors) return;
      
      const children = disableWidget.getElementChildren();
      if (children) {
        for (const child of children) {
          if (child.getElementSelector() === elementSelectors) return;
        }
      }
    }

    const role = window.AccessibilityUtils.getElementRole(element);
    if (role === 'group') {
      const disable = element.getElementAttribute('disabled') !== null;
      const ariaDisable = element.getElementAttribute('aria-disabled') !== null;
      if (disable || ariaDisable) return;
    }

    const test = new Test();

    const fgColor = element.getElementStyleProperty('color', null);
    let bgColor = this.getBackground(element);
    const opacity = parseFloat(element.getElementStyleProperty('opacity', null) || '1');
    const fontSize = element.getElementStyleProperty('font-size', null);
    const fontWeight = element.getElementStyleProperty('font-weight', null);
    const fontFamily = element.getElementStyleProperty('font-family', null);
    const fontStyle = element.getElementStyleProperty('font-style', null);
    const textShadow = element.getElementStyleProperty('text-shadow', null);

    if (textShadow && textShadow.trim() !== 'none' && textShadow.trim() !== '') {
      const pixelValues = textShadow.match(/(-?\d+px)/g);
      if (pixelValues && pixelValues.length >= 3) {
        const hs = Math.abs(parseInt(pixelValues[0].replace('px', ''), 10));
        const vs = Math.abs(parseInt(pixelValues[1].replace('px', ''), 10));
        const blur = parseInt(pixelValues[2].replace('px', ''), 10);
        if (blur > 0 || hs > 1 || vs > 1) {
          test.verdict = Verdict.WARNING;
          test.resultCode = 'W1';
          test.addElement(element);
          this.addTestResult(test);
          return;
        }
      }
    }

    if (this.isImage(bgColor)) {
      test.verdict = Verdict.WARNING;
      test.resultCode = 'W2';
      test.addElement(element);
      this.addTestResult(test);
      return;
    }

    const regexGradient = /((\w-?)*gradient.*)/gm;
    let regexGradientMatches = bgColor.match(regexGradient);
    if (regexGradientMatches) {
      if (this.isHumanLanguage(elementText || placeholder || "")) {
        this.evaluateGradient(test, element, regexGradientMatches[0], fgColor, opacity, fontSize, fontWeight, fontStyle, fontFamily, elementText || placeholder || "");
      } else {
        test.verdict = Verdict.PASSED;
        test.resultCode = 'P2';
        test.addElement(element);
        this.addTestResult(test);
      }
      return;
    }

    let parsedBG: RGBColor | undefined = this.parseRGBString(bgColor);
    if (parsedBG) parsedBG.alpha *= opacity;

    let elementAux = element;
    while (!parsedBG || (parsedBG.red === 0 && parsedBG.green === 0 && parsedBG.blue === 0 && parsedBG.alpha === 0)) {
      const parent = elementAux.getElementParent();
      if (!parent) break;
      const parentOpacity = parseFloat(parent.getElementStyleProperty('opacity', null) || '1');
      parsedBG = this.parseRGBString(this.getBackground(parent));
      if (parsedBG) parsedBG.alpha *= parentOpacity;
      elementAux = parent;
    }

    if (!parsedBG || parsedBG.alpha === 0) {
      parsedBG = { red: 255, green: 255, blue: 255, alpha: 1 };
    }

    if (parsedBG.alpha < 1) {
      parsedBG = this.flattenColors(parsedBG, { red: 255, green: 255, blue: 255, alpha: 1 });
    }

    const parsedFG = this.parseRGBString(fgColor);
    if (parsedFG) {
      parsedFG.alpha *= opacity;
      
      if (!this.equals(parsedBG, parsedFG)) {
        const textToVerify = elementText || placeholder || "";
        if (this.isHumanLanguage(textToVerify)) {
          const contrastRatio = this.getContrast(parsedBG, parsedFG);
          const isValid = this.hasValidContrastRatio(contrastRatio, fontSize, this.isBold(fontWeight));
          
          test.verdict = isValid ? Verdict.PASSED : Verdict.FAILED;
          test.resultCode = isValid ? 'P1' : 'F1';
          test.addElement(element);
          this.addTestResult(test);
        } else {
          test.verdict = Verdict.PASSED;
          test.resultCode = 'P2';
          test.addElement(element);
          this.addTestResult(test);
        }
      }
    }
  }

  private isHumanLanguage(text: string): boolean {
    return window.DomUtils.isHumanLanguage(text);
  }

  private evaluateGradient(test: Test, element: QWElement, parsedGradientString: string, fgColor: string, opacity: number, fontSize: string, fontWeight: string, fontStyle: string, fontFamily: string, elementText: string): boolean {
    if (parsedGradientString.startsWith('linear-gradient')) {
      const colors = this.parseGradientString(parsedGradientString);
      let isValid = true;
      const parsedFG = this.parseRGBString(fgColor);
      if (!parsedFG) return false;
      parsedFG.alpha *= opacity;

      const textSize = this.getTextSize(fontFamily.toLowerCase().replace(/['"]+/g, ''), parseInt(fontSize.replace('px', '')), this.isBold(fontWeight), fontStyle.toLowerCase().includes('italic'), elementText);
      if (textSize !== -1) {
        const elementWidth = element.getElementStyleProperty('width', null);
        const lastCharRatio = textSize / parseInt(elementWidth.replace('px', ''));
        const lastCharBgColor = this.getColorInGradient(colors[0], colors[colors.length - 1], lastCharRatio);
        isValid = isValid && this.hasValidContrastRatio(this.getContrast(colors[0], parsedFG), fontSize, this.isBold(fontWeight));
        isValid = isValid && this.hasValidContrastRatio(this.getContrast(lastCharBgColor, parsedFG), fontSize, this.isBold(fontWeight));
      } else {
        for (const color of colors) {
          isValid = isValid && this.hasValidContrastRatio(this.getContrast(color, parsedFG), fontSize, this.isBold(fontWeight));
        }
      }
      test.verdict = isValid ? Verdict.PASSED : Verdict.FAILED;
      test.resultCode = isValid ? 'P3' : 'F2';
    } else {
      test.verdict = Verdict.WARNING;
      test.resultCode = 'W3';
    }
    test.addElement(element);
    this.addTestResult(test);
    return true;
  }

  private parseGradientString(gradient: string): RGBColor[] {
    const regex = /rgb(a?)\((\d+), (\d+), (\d+)+(, +(\d)+)?\)/gm;
    const colorsMatch = gradient.match(regex);
    const colors: RGBColor[] = [];
    for (const stringColor of colorsMatch || []) {
      const parsed = this.parseRGBString(stringColor);
      if (parsed) colors.push(parsed);
    }
    return colors;
  }

  private getColorInGradient(fromColor: RGBColor, toColor: RGBColor, ratio: number): RGBColor {
    return {
      red: fromColor.red + (toColor.red - fromColor.red) * ratio,
      green: fromColor.green + (toColor.green - fromColor.green) * ratio,
      blue: fromColor.blue + (toColor.blue - fromColor.blue) * ratio,
      alpha: 1
    };
  }

  private getTextSize(font: string, fontSize: number, bold: boolean, italic: boolean, text: string): number {
    return window.DomUtils.getTextSize(font, fontSize, bold, italic, text);
  }

  private getBackground(element: QWElement): string {
    const bgImg = element.getElementStyleProperty('background-image', null);
    if (bgImg && bgImg !== 'none' && bgImg !== '') return bgImg;
    const bgColor = element.getElementStyleProperty('background-color', null);
    return (bgColor && bgColor !== '' && bgColor !== 'transparent') ? bgColor : element.getElementStyleProperty('background', null);
  }

  private isImage(s: string): boolean {
    const lower = s.toLowerCase();
    return lower.includes('.jpg') || lower.includes('.png') || lower.includes('.svg') || lower.includes('url(');
  }

  private parseRGBString(colorString: string): RGBColor | undefined {
    if (!colorString || colorString === 'transparent' || colorString === 'none') return { red: 0, green: 0, blue: 0, alpha: 0 };
    const rgb = colorString.match(/^rgb\((\d+), (\d+), (\d+)\)/);
    if (rgb) return { red: parseInt(rgb[1]), green: parseInt(rgb[2]), blue: parseInt(rgb[3]), alpha: 1.0 };
    const rgba = colorString.match(/^rgba\((\d+), (\d+), (\d+), (\d*(\.\d+)?)\)/);
    if (rgba) return { red: parseInt(rgba[1]), green: parseInt(rgba[2]), blue: parseInt(rgba[3]), alpha: Math.round(parseFloat(rgba[4]) * 100) / 100 };
    try {
      const color = new Color(colorString);
      const srgb = color.to('srgb');
      return { 
        red: Math.round(srgb.coords[0] * 255), 
        green: Math.round(srgb.coords[1] * 255), 
        blue: Math.round(srgb.coords[2] * 255), 
        alpha: color.alpha ?? 1 
      };
    } catch (e) { return undefined; }
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
    const a = [c.red, c.green, c.blue].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  private hasValidContrastRatio(contrast: number, fontSize: string, isBold: boolean): boolean {
    const size = parseFloat(fontSize);
    const threshold = (isBold && size >= 18.66) || size >= 24 ? 3 : 4.5;
    return (contrast + 0.02) >= threshold;
  }

  private isBold(fontWeight: string): boolean {
    return !!fontWeight && ['bold', 'bolder', '700', '800', '900'].includes(fontWeight);
  }

  private equals(c1: RGBColor, c2: RGBColor): boolean {
    return c1.red === c2.red && c1.green === c2.green && c1.blue === c2.blue && c1.alpha === c2.alpha;
  }
}

export { QW_ACT_R37 };
