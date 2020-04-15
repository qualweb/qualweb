'use strict';

import { ElementHandle, Page } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils, DomUtils } from '@qualweb/util'
import LanguageDetect from 'languagedetect';
import pixelWidth from 'string-pixel-width';

const detector = new LanguageDetect();

class QW_ACT_R37 extends Rule {

  constructor() {
    super({
      name: 'Text has minimum contrast',
      code: 'QW-ACT-R37',
      mapping: 'afw4f7',
      description: 'This rule checks that the highest possible contrast of every text character with its background meets the minimal contrast requirement.',
      metadata: {
        target: {
          element: ['*'],
        },
        'success-criteria': [
          {
            name: '1.4.3',
            level: 'A',
            principle: 'Perceivable',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html'
          },
          {
            name: '1.4.6',
            level: 'AA',
            principle: 'Perceivable',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html'
          },
        ],
        related: ['G18, G145', 'F83'],
        url: 'https://github.com/act-rules/act-rules.github.io/blob/develop/_rules/text-contrast-afw4f7.md',
        passed: 0,
        warning: 0,
        failed: 0,
        type: ['ACTRule', 'TestCase'],
        a11yReq: ['WCAG21:language'],
        outcome: '',
        description: ''
      },
      results: new Array<ACTRuleResult>()
    });
  }

  async execute(element: ElementHandle | undefined, page: Page): Promise<void> {

    let disabledWidgets = await AccessibilityUtils.getDisabledWidgets(page);
    const elements = await page.$$('*');
    if (elements.length > 0) {
      for (const element of elements || []) {
        let tagName  = await DomUtils.getElementTagName(element);
        if(tagName === 'head' || tagName === 'body' || tagName === 'html' ||
          tagName === 'script' || tagName === 'style' || tagName === 'meta')
            continue;

        const evaluation: ACTRuleResult = {
          verdict: '',
          description: '',
          resultCode: ''
        };

        let visible = await DomUtils.isElementVisible(element);
        if(!visible){
          evaluation.verdict = 'inapplicable';
          evaluation.description = 'Element is not visible.';
          evaluation.resultCode = 'RC1';
          await super.addEvaluationResult(evaluation, element);
          continue;
        }

        let hasTextNode = await this.elementHasTextNode(element);
        let elementText = await AccessibilityUtils.getTrimmedText(element);

        if(!hasTextNode || elementText === ''){
          evaluation.verdict = 'inapplicable';
          evaluation.description = `Element doesn't have text.`;
          evaluation.resultCode = 'RC2';
          await super.addEvaluationResult(evaluation, element);
          continue;
        }

        let isHTML = await this.isElementHTMLElement(element);
        if(!isHTML){
          evaluation.verdict = 'inapplicable';
          evaluation.description = 'Element is not an HTML element.';
          evaluation.resultCode = 'RC3';
          await super.addEvaluationResult(evaluation, element);
          continue;
        }

        let isWidget = await AccessibilityUtils.isElementWidget(element);
        if(isWidget){
          evaluation.verdict = 'inapplicable';
          evaluation.description = 'Element has a semantic role that inherits from widget.';
          evaluation.resultCode = 'RC4';
          await super.addEvaluationResult(evaluation, element);
          continue;
        }

        const elementSelectors = await DomUtils.getElementSelector(element);
        let selectors;
        let shouldContinue = false;
        for (let disableWidget of disabledWidgets){
          selectors = await AccessibilityUtils.getAccessibleNameSelector(disableWidget, page);

          if(selectors && selectors.includes(elementSelectors)){
            evaluation.verdict = 'inapplicable';
            evaluation.description = 'This text is part of a label of a disabled widget.';
            evaluation.resultCode = 'RC5';
            await super.addEvaluationResult(evaluation, element);
            shouldContinue = true;
            break;
          }
        }

        if(shouldContinue)
          continue;

        let role = await AccessibilityUtils.getElementRole(element, page);

        if(role === 'group'){
          if(await DomUtils.elementHasAttribute(element, 'disabled')){
            evaluation.verdict = 'inapplicable';
            evaluation.description = 'Element has a semantic role of group and is disabled.';
            evaluation.resultCode = 'RC6';
            await super.addEvaluationResult(evaluation, element);
            continue;
          }
        }

        const fgColor = await DomUtils.getElementStyleProperty(element, "color", null);
        const bgColor = await DomUtils.getElementStyleProperty(element, "background", null);
        const opacity = parseFloat(await DomUtils.getElementStyleProperty(element, "opacity", null));
        const fontSize = await DomUtils.getElementStyleProperty(element, "font-size", null);
        const fontWeight = await DomUtils.getElementStyleProperty(element, "font-weight", null);
        const fontFamily = await DomUtils.getElementStyleProperty(element, "font-family", null);
        const fontStyle = await DomUtils.getElementStyleProperty(element, "font-style", null);

        if(bgColor.toLowerCase().includes("jpeg") || bgColor.toLowerCase().includes("jpg") || bgColor.toLowerCase().includes("png") || bgColor.toLowerCase().includes("svg")){
          evaluation.verdict = 'warning';
          evaluation.description = 'Element has an image on background.';
          evaluation.resultCode = 'RC12';
          await super.addEvaluationResult(evaluation, element);
          continue
        }

        //TODO check char to char
        //TODO check if there is more colors
        //TODO account for margin and padding

        const regexGradient = /((\w-?)*gradient.*)/gm;
        let regexGradientMatches = bgColor.match(regexGradient);
        if(regexGradientMatches){
          if(this.isHumanLanguage(elementText)){
            let parsedGradientString = regexGradientMatches[0];
            if(parsedGradientString.startsWith("linear-gradient")){
              let gradientDirection = this.getGradientDirection(parsedGradientString);
              if(gradientDirection === 'to right'){
                let colors = this.parseGradientString(parsedGradientString, opacity);
                let isValid = true;
                let contrastRatio;
                let textSize = this.getTextSize(fontFamily.toLowerCase().replace(/['"]+/g, ''), parseInt(fontSize.replace('px', "")), fontWeight.toLowerCase().includes("bold"), fontStyle.toLowerCase().includes("italic"), elementText)
                if(textSize !== -1){
                  let elementWidth = await DomUtils.getElementStyleProperty(element, "width", null);
                  let lastCharRatio = textSize / parseInt(elementWidth.replace('px', ""));
                  let lastCharBgColor = this.getColorInGradient(colors[0], colors[colors.length - 1], lastCharRatio);
                  contrastRatio = this.getContrast(colors[0], this.parseRgbString(fgColor, opacity));
                  isValid = isValid && this.hasValidContrastRatio(contrastRatio, fontSize, fontWeight==='bold');
                  contrastRatio = this.getContrast(lastCharBgColor, this.parseRgbString(fgColor, opacity));
                  isValid = isValid && this.hasValidContrastRatio(contrastRatio, fontSize, fontWeight==='bold');
                }else{
                  for(let color of colors){
                    contrastRatio = this.getContrast(color, this.parseRgbString(fgColor, opacity));
                    isValid = isValid && this.hasValidContrastRatio(contrastRatio, fontSize, fontWeight==='bold');
                  }
                }
                if(isValid){
                  evaluation.verdict = 'passed';
                  evaluation.description = 'Element has gradient with contrast ratio higher than minimum.';
                  evaluation.resultCode = 'RC8';
                }else{
                  evaluation.verdict = 'failed';
                  evaluation.description = 'Element has gradient with contrast ratio lower than minimum.';
                  evaluation.resultCode = 'RC10';
                }
              }else if(gradientDirection === 'to left'){
                //TODO
              }else{
                evaluation.verdict = 'warning';
                evaluation.description = 'Element has an gradient that we cant verify.';
                evaluation.resultCode = 'RC13';
                await super.addEvaluationResult(evaluation, element);
                continue
              }
            }else{
              evaluation.verdict = 'warning';
              evaluation.description = 'Element has an gradient that we cant verify.';
              evaluation.resultCode = 'RC13';
              await super.addEvaluationResult(evaluation, element);
              continue
            }
          }else{
            evaluation.verdict = 'passed';
            evaluation.description = `Element doesn't have human language text.`;
            evaluation.resultCode = 'RC9';
          }

        }else{
          let parsedBG = this.parseRgbString(bgColor, opacity);
          let parsedFG = this.parseRgbString(fgColor, opacity);

          if(this.equals(parsedBG, parsedFG)){
            evaluation.verdict = 'inapplicable';
            evaluation.description = 'Colors are equal.';
            evaluation.resultCode = 'RC7';
          }else{
            if(this.isHumanLanguage(elementText)){
              let contrastRatio = this.getContrast(parsedBG, parsedFG);
              let isValid = this.hasValidContrastRatio(contrastRatio, fontSize, fontWeight==='bold');
              if(isValid){
                evaluation.verdict = 'passed';
                evaluation.description = 'Element has contrast ratio higher than minimum.';
                evaluation.resultCode = 'RC9';
              }else{
                evaluation.verdict = 'failed';
                evaluation.description = 'Element has contrast ratio lower than minimum.';
                evaluation.resultCode = 'RC11';
              }
            }else{
              evaluation.verdict = 'passed';
              evaluation.description = `Element doesn't have human language text.`;
              evaluation.resultCode = 'RC9';
            }
          }
        }
        await super.addEvaluationResult(evaluation, element);
      }
    }
  }

  isHumanLanguage(string): boolean{
    return detector.detect(string).length > 0;
  }

  isElementHTMLElement(element: ElementHandle): Promise<boolean>{
    return element.evaluate((elem) => {
      return elem instanceof HTMLElement;
    });
  }

  elementHasTextNode(element: ElementHandle): Promise<boolean>{
    return element.evaluate((el)  => {
      if(el.firstChild !== null)
        return el.firstChild.nodeType === 3;
      else
        return false;
    });
  }

  equals(color1, color2): boolean{
    return color1.red === color2.red && color1.green === color2.green && color1.blue === color2.blue && color1.alpha === color2.alpha;
  }

  getGradientDirection(gradient: string): string | undefined{
    const regex = /(?<=linear-gradient\()(.*?)(?=,)/gm;
    let directionMatch = gradient.match(regex);
    if(directionMatch){
      let direction = directionMatch[0];
      if(direction === '90deg')
        return 'to right'
      if(direction === '-90deg')
        return 'to left'

      return direction
    }

    return undefined;
  }

  parseGradientString(gradient: string, opacity: number): any{
    const regex = /rgb(a?)\((\d+), (\d+), (\d+)+(, +(\d)+)?\)/gm;
    let colorsMatch = gradient.match(regex);
    let colors: any = []
    for(let stringColor of colorsMatch || []){
      colors.push(this.parseRgbString(stringColor, opacity));
    }

    return colors;
  }

  parseRgbString(colorString: string, opacity: number): any {

    let rgbRegex = /^rgb\((\d+), (\d+), (\d+)\)/;
    let rgbaRegex = /^rgba\((\d+), (\d+), (\d+), (\d*(\.\d+)?)\)/;

    // IE can pass transparent as value instead of rgba
    if (colorString === 'transparent') {
      return{"red": 0, "green": 0, "blue": 0, "alpha": 0};
    }

    let match = colorString.match(rgbRegex);
    if (match) {
      return{"red": parseInt(match[1], 10), "green": parseInt(match[2], 10), "blue": parseInt(match[3], 10), "alpha": opacity};
    }

    match = colorString.match(rgbaRegex);
    if (match) {
      // alpha values can be between 0 and 1, with browsers having
      // different floating point precision. for example,
      // 'rgba(0,0,0,0.5)' results in 'rgba(0,0,0,0.498039)' in Safari
      // when getting the computed style background-color property. to
      // fix this, we'll round all alpha values to 2 decimal points.
      if(match[1] === "0" && match[2] === "0" && match[3] === "0" && match[4] === "0")
        return{"red": 255, "green": 255, "blue": 255, "alpha": 1};
      else
        return{"red": parseInt(match[1], 10), "green": parseInt(match[2], 10), "blue": parseInt(match[3], 10), "alpha": Math.round(parseFloat(match[4]) * 100) / 100};
    }
  };

  getRelativeLuminance(red, green, blue): number {
    let rSRGB = red / 255;
    let gSRGB = green / 255;
    let bSRGB = blue / 255;

    let r =
      rSRGB <= 0.03928 ? rSRGB / 12.92 : Math.pow((rSRGB + 0.055) / 1.055, 2.4);
    let g =
      gSRGB <= 0.03928 ? gSRGB / 12.92 : Math.pow((gSRGB + 0.055) / 1.055, 2.4);
    let b =
      bSRGB <= 0.03928 ? bSRGB / 12.92 : Math.pow((bSRGB + 0.055) / 1.055, 2.4);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  flattenColors(fgColor, bgColor): any {
    let fgAlpha = fgColor["alpha"];
    let red = (1 - fgAlpha) * bgColor["red"] + fgAlpha * fgColor["red"];
    let green = (1 - fgAlpha) * bgColor["green"] + fgAlpha * fgColor["green"];
    let blue = (1 - fgAlpha) * bgColor["blue"] + fgAlpha * fgColor["blue"];
    let alpha = fgColor["alpha"] + bgColor["alpha"] * (1 - fgColor["alpha"]);

    return {"red": red, "green": green, "blue": blue, "alpha": alpha};
  };

  getContrast(bgColor, fgColor): number {

    if (fgColor.alpha < 1) {
      fgColor = this.flattenColors(fgColor, bgColor);
    }

    let bL = this.getRelativeLuminance(bgColor['red'], bgColor['green'], bgColor['blue']);
    let fL = this.getRelativeLuminance(fgColor['red'], fgColor['green'], fgColor['blue']);

    return (Math.max(fL, bL) + 0.05) / (Math.min(fL, bL) + 0.05);
  };

  hasValidContrastRatio(contrast, fontSize, isBold) {

    let isSmallFont =
      (isBold && Math.ceil(fontSize * 72) / 96 < 14) ||
      (!isBold && Math.ceil(fontSize * 72) / 96 < 18);
      let expectedContrastRatio = isSmallFont ? 4.5 : 3;

    return contrast > expectedContrastRatio;
  };

  getTextSize(font: string, fontSize: number, bold: boolean, italic: boolean, string: string): number{
    try {
      const width = pixelWidth(string, { font: font, size: fontSize, bold: bold, italic: italic });
      return width;
    } catch (error) {
      return -1;
    }

  }

  getColorInGradient(fromColor: any, toColor: any, ratio: number): any{

    let red = fromColor['red'] + ((toColor['red'] - fromColor['red']) * ratio);
    let green = fromColor['green'] + ((toColor['green'] - fromColor['green']) * ratio);
    let blue = fromColor['blue'] + ((toColor['blue'] - fromColor['blue']) * ratio);

    return {"red": red, "green": green, "blue": blue, "alpha": 1};

  }
}

export = QW_ACT_R37;
