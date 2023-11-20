import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, ElementIsVisible } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R68 extends AtomicRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
  }

  @ElementExists
  @ElementIsVisible
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    if (element.hasCSSProperty('line-height')) {
      const styleAttribute = element.getElementAttribute('style');
      const declaredLineHeight = this.parseStyle(styleAttribute);
      const computedRawLineHeight = element.getCSSProperty('line-height');
      const computedLineHeight = element.getElementStyleProperty('line-height', null);
      const fontSize = element.getElementStyleProperty('font-size', null);
      const numLines = this.computeLineNumber(element, computedLineHeight);
      
      if (numLines < 2) { // no soft-wrap
        return;
      }

      if (!this.isImportant(computedRawLineHeight, element)) {
        test.verdict = 'passed';
        test.resultCode = 'P1';
      } else if (!this.isNormal(computedLineHeight, element) && this.isLarge(computedLineHeight, fontSize)) {
        test.verdict = 'passed';
        test.resultCode = 'P2';
      } else if (!this.isCascade(declaredLineHeight, computedRawLineHeight)) {
        test.verdict = 'passed';
        test.resultCode = 'P3';
      } else {
        test.verdict = 'failed';
        test.resultCode = 'F1';
      }

      test.addElement(element, true, false, true);
      super.addTestResult(test);
    }
  }

  private parseStyle(style: string | null): string {
    if (style === null) {
      style = '';
    }
    const startLS = style.indexOf('line-height:');
    let endLS = style.indexOf(';', startLS);
    if (endLS === -1) {
      endLS = style.length;
    }
    return style.substring(startLS + 12, endLS);
  }

  private isImportant(cssValue: any, element: typeof window.qwElement): boolean {
    if (cssValue.value === 'inherit' || cssValue.value === 'unset') {
      const parent = this.findParentWithCSSProperty(element.getElementParent());
      if (parent === null) return false;
      return this.isImportant(parent?.getCSSProperty('line-height'), parent);
    }
    return cssValue.important;
  }

  private isNormal(cssValue: any, element: typeof window.qwElement): boolean {
    if (cssValue.value === 'inherit' || cssValue.value === 'unset') {
      const parent = this.findParentWithCSSProperty(element.getElementParent());
      if (parent === null) return false;
      return this.isImportant(parent?.getCSSProperty('line-height'), parent);
    }
    return cssValue.value === 'normal';
  }

  private isLarge(lineHeight: string, fontSize: string): boolean {
    const line = parseFloat(lineHeight.slice(0, -2)); //remove px from end of string
    const font = parseFloat(fontSize.slice(0, -2));
    return line >= font * 1.5;
  }

  private isCascade(declaredStyle: string, computedStyle: any): boolean {
    return declaredStyle.includes(computedStyle.value);
  }

  private findParentWithCSSProperty(element: typeof window.qwElement | null): typeof window.qwElement | null {
    while (element !== null) {
      if (element?.getCSSProperty('line-height')) {
        return element;
      }
      element = element.getElementParent();
    }
    return null;
  }

  private computeLineNumber(element: typeof window.qwElement, lineHeight: string): number {
    const elementHeight = parseInt(element.getElementProperty('offsetHeight'));
    const padding_top = parseInt(element.getElementStyleProperty('padding-top', null));
    const padding_bottom = parseInt(element.getElementStyleProperty('padding-bottom', null));
    const border_top = parseInt(element.getElementStyleProperty('border-top', null));
    const border_bottom = parseInt(element.getElementStyleProperty('border-bottom', null));
    const textHeight = elementHeight - padding_top - padding_bottom - border_top - border_bottom;
    const numLines = textHeight / parseInt(lineHeight);

    return numLines;
  }
}

export = QW_ACT_R68;
