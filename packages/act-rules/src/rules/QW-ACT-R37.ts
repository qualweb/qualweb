import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import {
  ACTRuleDecorator,
  ElementExists,
  ElementHasText,
  ElementIsHTMLElement,
  ElementIsNot,
  ElementIsVisible,
  ElementIsNotWidget
} from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R37 extends AtomicRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
  }

  @ElementExists
  @ElementIsHTMLElement
  @ElementIsNot(['html', 'head', 'body', 'script', 'style', 'meta'])
  @ElementIsVisible
  @ElementIsNotWidget
  @ElementHasText
  execute(element: typeof window.qwElement): void {
    const disabledWidgets = window.disabledWidgets;

    const test = new Test();

    const visible = window.DomUtils.isElementVisible(element);

    if (!visible) {
      return;
    }

    const hasTextNode = element.hasTextNode();
    const elementText = element.getElementOwnText();

    if (!hasTextNode && elementText.trim() === '') {
      return;
    }

    const isHTML = element.isElementHTMLElement();
    if (!isHTML) {
      return;
    }

    const isWidget = window.AccessibilityUtils.isElementWidget(element);
    if (isWidget) {
      return;
    }

    const elementSelectors = element.getElementSelector();

    for (const disableWidget of disabledWidgets || []) {
      const selectors = window.AccessibilityUtils.getAccessibleNameSelector(disableWidget);
      if (disableWidget && selectors && selectors.includes(elementSelectors)) {
        return;
      }
    }

    const role = window.AccessibilityUtils.getElementRole(element);
    if (role === 'group') {
      const disable = element.getElementAttribute('disabled') !== null;
      const ariaDisable = element.getElementAttribute('aria-disabled') !== null;
      if (disable || ariaDisable) {
        return;
      }
    }

    const fgColor = element.getElementStyleProperty('color', null);
    let bgColor = this.getBackground(element);
    const opacity = parseFloat(element.getElementStyleProperty('opacity', null));
    const fontSize = element.getElementStyleProperty('font-size', null);
    const fontWeight = element.getElementStyleProperty('font-weight', null);
    const fontFamily = element.getElementStyleProperty('font-family', null);
    const fontStyle = element.getElementStyleProperty('font-style', null);
    const textShadow = element.getElementStyleProperty('text-shadow', null);

    if (textShadow.trim() !== 'none') {
      const properties = textShadow.trim().split(' ');
      if (properties.length === 6) {
        //const textShadowColor = properties[0] + ' ' + properties[1] + ' ' + properties[2];
        const vs = parseInt(properties[3], 0);
        const hs = parseInt(properties[4], 0);
        const blur = parseInt(properties[5], 0);
        const validateTextShadow = vs === 0 && hs === 0 && blur > 0 && blur <= 15;
        if (validateTextShadow) {
          test.verdict = 'warning';
          test.resultCode = 'W1';

          test.addElement(element);
          super.addTestResult(test);
          return;
        }
      }
    }

    if (this.isImage(bgColor)) {
      test.verdict = 'warning';
      test.resultCode = 'W2';

      test.addElement(element);
      super.addTestResult(test);
      return;
    }

    //TODO check char to char
    //TODO check if there is more colors
    //TODO account for margin and padding

    //const elementText = window.DomUtils.getTrimmedText(element);

    const regexGradient = /((\w-?)*gradient.*)/gm;
    let regexGradientMatches = bgColor.match(regexGradient);
    if (regexGradientMatches) {
      if (this.isHumanLanguage(elementText)) {
        const parsedGradientString = regexGradientMatches[0];
        this.evaluateGradient(
          test,
          element,
          parsedGradientString,
          fgColor,
          opacity,
          fontSize,
          fontWeight,
          fontStyle,
          fontFamily,
          elementText
        );
      } else {
        test.verdict = 'passed';
        test.resultCode = 'P2';

        test.addElement(element);
        super.addTestResult(test);
      }
    } else {
      let parsedBG = this.parseRGBString(bgColor, opacity);
      let elementAux = element;
      let opacityAUX;

      while (
        parsedBG === undefined ||
        (parsedBG.red === 0 && parsedBG.green === 0 && parsedBG.blue === 0 && parsedBG.alpha === 0)
      ) {
        const parent = elementAux.getElementParent();
        if (parent) {
          bgColor = this.getBackground(parent);
          if (this.isImage(bgColor)) {
            test.verdict = 'warning';
            test.resultCode = 'W2';

            test.addElement(element);
            super.addTestResult(test);
            return;
          } else {
            //helps visualize
            regexGradientMatches = bgColor.match(regexGradient);
            if (regexGradientMatches) {
              const parsedGradientString = regexGradientMatches[0];
              if (
                this.evaluateGradient(
                  test,
                  element,
                  parsedGradientString,
                  fgColor,
                  opacity,
                  fontSize,
                  fontWeight,
                  fontStyle,
                  fontFamily,
                  elementText
                )
              ) {
                return;
              }
            } else {
              opacityAUX = parseFloat(parent.getElementStyleProperty('opacity', null));
              parsedBG = this.parseRGBString(parent.getElementStyleProperty('background', null), opacityAUX);
              elementAux = parent;
            }
          }
        } else {
          break;
        }
      }

      // if we cant find a bg color, we assume that is white (default bg page color)
      if (
        parsedBG === undefined ||
        (parsedBG.red === 0 && parsedBG.green === 0 && parsedBG.blue === 0 && parsedBG.alpha === 0)
      ) {
        parsedBG = { red: 255, green: 255, blue: 255, alpha: 1 };
      }

      let secondElement = elementAux;
      if (parsedBG.alpha !== 1) {
        // check if there is a solid color in the background and mix the colors
        let secondOpacity = opacityAUX;
        let parsedSecondBG = parsedBG;
        while (parsedSecondBG.alpha !== 1) {
          const parent = secondElement.getElementParent();
          if (!parent) {
            break;
          } else {
            secondOpacity = parseFloat(parent.getElementStyleProperty('opacity', null));
            parsedSecondBG = this.parseRGBString(parent.getElementStyleProperty('background', null), secondOpacity);
            secondElement = parent;
          }
        }
        if (parsedSecondBG.alpha === 1) {
          const outputRed = Math.round(parsedBG.red * parsedBG.alpha + parsedSecondBG.red * (1.0 - parsedBG.alpha));
          const outputGreen = Math.round(
            parsedBG.green * parsedBG.alpha + parsedSecondBG.green * (1.0 - parsedBG.alpha)
          );
          const outputBlue = Math.round(parsedBG.blue * parsedBG.alpha + parsedSecondBG.blue * (1.0 - parsedBG.alpha));
          parsedBG = { red: outputRed, green: outputGreen, blue: outputBlue, alpha: 1 };
        }
      }

      const parsedFG = this.parseRGBString(fgColor, opacity);

      if (!this.equals(parsedBG, parsedFG)) {
        if (this.isHumanLanguage(elementText)) {
          const contrastRatio = this.getContrast(parsedBG, parsedFG);
          const isValid = this.hasValidContrastRatio(contrastRatio, fontSize, this.isBold(fontWeight));
          if (isValid) {
            test.verdict = 'passed';
            test.resultCode = 'P1';

            test.addElement(element);
            super.addTestResult(test);
          } else {
            test.verdict = 'failed';
            test.resultCode = 'F1';

            test.addElement(element);
            super.addTestResult(test);
          }
        } else {
          test.verdict = 'passed';
          test.resultCode = 'P2';

          test.addElement(element);
          super.addTestResult(test);
        }
      }
    }
  }

  getBackground(element: typeof window.qwElement): string {
    const backgroundImage = element.getElementStyleProperty('background-image', null);
    if (backgroundImage === 'none') {
      let bg = element.getElementStyleProperty('background', null);
      if (bg === '') {
        bg = element.getElementStyleProperty('background-color', null);
      }

      return bg;
    } else {
      return backgroundImage;
    }
  }

  isImage(color: string): boolean {
    return (
      color.toLowerCase().includes('.jpeg') ||
      color.toLowerCase().includes('.jpg') ||
      color.toLowerCase().includes('.png') ||
      color.toLowerCase().includes('.svg')
    );
  }

  evaluateGradient(
    test: Test,
    element: typeof window.qwElement,
    parsedGradientString: any,
    fgColor: any,
    opacity: number,
    fontSize: string,
    fontWeight: string,
    fontStyle: string,
    fontFamily: string,
    elementText: string
  ): boolean {
    if (parsedGradientString.startsWith('linear-gradient')) {
      const gradientDirection = this.getGradientDirection(parsedGradientString);
      if (gradientDirection === 'to right') {
        const colors = this.parseGradientString(parsedGradientString, opacity);
        let isValid = true;
        let contrastRatio;
        const textSize = this.getTextSize(
          fontFamily.toLowerCase().replace(/['"]+/g, ''),
          parseInt(fontSize.replace('px', '')),
          this.isBold(fontWeight),
          fontStyle.toLowerCase().includes('italic'),
          elementText
        );
        if (textSize !== -1) {
          const elementWidth = element.getElementStyleProperty('width', null);
          const lastCharRatio = textSize / parseInt(elementWidth.replace('px', ''));
          const lastCharBgColor = this.getColorInGradient(colors[0], colors[colors.length - 1], lastCharRatio);
          contrastRatio = this.getContrast(colors[0], this.parseRGBString(fgColor, opacity));
          isValid = isValid && this.hasValidContrastRatio(contrastRatio, fontSize, this.isBold(fontWeight));
          contrastRatio = this.getContrast(lastCharBgColor, this.parseRGBString(fgColor, opacity));
          isValid = isValid && this.hasValidContrastRatio(contrastRatio, fontSize, this.isBold(fontWeight));
        } else {
          for (const color of colors) {
            contrastRatio = this.getContrast(color, this.parseRGBString(fgColor, opacity));
            isValid = isValid && this.hasValidContrastRatio(contrastRatio, fontSize, this.isBold(fontWeight));
          }
        }
        if (isValid) {
          test.verdict = 'passed';
          test.resultCode = 'P3';
        } else {
          test.verdict = 'failed';
          test.resultCode = 'F2';
        }
      } else if (gradientDirection === 'to left') {
        //TODO
        test.verdict = 'warning';
        test.resultCode = 'W3';
      } else {
        test.verdict = 'warning';
        test.resultCode = 'W3';
      }
    } else {
      test.resultCode = 'W3';
    }

    test.addElement(element);
    super.addTestResult(test);
    return true;
  }

  isHumanLanguage(text: string): boolean {
    return window.DomUtils.isHumanLanguage(text);
  }

  equals(color1: any, color2: any): boolean {
    return (
      color1.red === color2.red &&
      color1.green === color2.green &&
      color1.blue === color2.blue &&
      color1.alpha === color2.alpha
    );
  }

  getGradientDirection(gradient: string): string | undefined {
    const direction = gradient.replace('linear-gradient(', '').split(',')[0];
    if (direction) {
      if (direction === '90deg') return 'to right';
      if (direction === '-90deg') return 'to left';

      return direction;
    }

    return undefined;
  }

  parseGradientString(gradient: string, opacity: number): any {
    const regex = /rgb(a?)\((\d+), (\d+), (\d+)+(, +(\d)+)?\)/gm;
    const colorsMatch = gradient.match(regex);
    const colors: any = [];
    for (const stringColor of colorsMatch || []) {
      colors.push(this.parseRGBString(stringColor, opacity));
    }

    return colors;
  }

  parseRGBString(colorString: string, opacity: number): any {
    const rgbRegex = /^rgb\((\d+), (\d+), (\d+)\)/;
    const rgbaRegex = /^rgba\((\d+), (\d+), (\d+), (\d*(\.\d+)?)\)/;

    // IE can pass transparent as value instead of rgba
    if (colorString === 'transparent') {
      return { red: 0, green: 0, blue: 0, alpha: 0 };
    }

    let match = colorString.match(rgbRegex);
    if (match) {
      return {
        red: parseInt(match[1], 10),
        green: parseInt(match[2], 10),
        blue: parseInt(match[3], 10),
        alpha: opacity
      };
    }

    match = colorString.match(rgbaRegex);
    if (match) {
      // if(match[1] === "0" && match[2] === "0" && match[3] === "0" && match[4] === "0")
      //   return{"red": 255, "green": 255, "blue": 255, "alpha": 1};
      // else
      return {
        red: parseInt(match[1], 10),
        green: parseInt(match[2], 10),
        blue: parseInt(match[3], 10),
        alpha: Math.round(parseFloat(match[4]) * 100) / 100
      };
    }
  }

  getRelativeLuminance(red: number, green: number, blue: number): number {
    const rSRGB = red / 255;
    const gSRGB = green / 255;
    const bSRGB = blue / 255;

    const r = rSRGB <= 0.03928 ? rSRGB / 12.92 : Math.pow((rSRGB + 0.055) / 1.055, 2.4);
    const g = gSRGB <= 0.03928 ? gSRGB / 12.92 : Math.pow((gSRGB + 0.055) / 1.055, 2.4);
    const b = bSRGB <= 0.03928 ? bSRGB / 12.92 : Math.pow((bSRGB + 0.055) / 1.055, 2.4);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  flattenColors(fgColor: any, bgColor: any): any {
    const fgAlpha = fgColor['alpha'];
    const red = (1 - fgAlpha) * bgColor['red'] + fgAlpha * fgColor['red'];
    const green = (1 - fgAlpha) * bgColor['green'] + fgAlpha * fgColor['green'];
    const blue = (1 - fgAlpha) * bgColor['blue'] + fgAlpha * fgColor['blue'];
    const alpha = fgColor['alpha'] + bgColor['alpha'] * (1 - fgColor['alpha']);

    return { red: red, green: green, blue: blue, alpha: alpha };
  }

  private isBold(fontWeight: string): boolean {
    return !!fontWeight && ['bold', 'bolder', '700', '800', '900'].includes(fontWeight);
  }

  getContrast(bgColor: any, fgColor: any): number {
    if (fgColor.alpha < 1) {
      fgColor = this.flattenColors(fgColor, bgColor);
    }

    const bL = this.getRelativeLuminance(bgColor['red'], bgColor['green'], bgColor['blue']);
    const fL = this.getRelativeLuminance(fgColor['red'], fgColor['green'], fgColor['blue']);

    return (Math.max(fL, bL) + 0.05) / (Math.min(fL, bL) + 0.05);
  }

  hasValidContrastRatio(contrast: number, fontSize: string, isBold: boolean): boolean {
    /*const isSmallFont =
      (isBold && Math.ceil(parseInt(fontSize) * 96) / 72 < 14) ||
      (!isBold && Math.ceil(parseInt(fontSize) * 96) / 72 < 18);*/

    const isSmallFont = (isBold && parseFloat(fontSize) < 18.6667) || (!isBold && parseFloat(fontSize) < 24);
    const expectedContrastRatio = isSmallFont ? 4.5 : 3;

    return contrast >= expectedContrastRatio;
  }

  getTextSize(font: string, fontSize: number, bold: boolean, italic: boolean, text: string): number {
    return window.DomUtils.getTextSize(font, fontSize, bold, italic, text);
  }

  getColorInGradient(fromColor: any, toColor: any, ratio: number): any {
    const red = fromColor['red'] + (toColor['red'] - fromColor['red']) * ratio;
    const green = fromColor['green'] + (toColor['green'] - fromColor['green']) * ratio;
    const blue = fromColor['blue'] + (toColor['blue'] - fromColor['blue']) * ratio;

    return { red: red, green: green, blue: blue, alpha: 1 };
  }
}

export = QW_ACT_R37;
