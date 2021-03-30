import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, ElementIsVisible } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R69 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  @ElementIsVisible
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    if (element.hasCSSProperty('word-spacing')) {
      const styleAttribute = element.getElementAttribute('style');
      const declaredWordSpacing = this.parseStyle(styleAttribute);
      const computedRawWordSpacing = element.getCSSProperty('word-spacing');
      const computedWordSpacing = element.getElementStyleProperty('word-spacing', null);
      const fontSize = element.getElementStyleProperty('font-size', null);

      if (!this.isImportant(computedRawWordSpacing, element)) {
        test.verdict = 'passed';
        test.description = 'The word-spacing property is not !important';
        test.resultCode = 'RC1';
      } else if (this.isWide(computedWordSpacing, fontSize)) {
        test.verdict = 'passed';
        test.description = 'The word-spacing is at least 1.5 times the font-size.';
        test.resultCode = 'RC2';
      } else if (!this.isCascade(declaredWordSpacing, computedRawWordSpacing)) {
        test.verdict = 'passed';
        test.description = 'The cascaded word-spacing is not the declared value.';
        test.resultCode = 'RC3';
      } else {
        test.verdict = 'failed';
        test.description = 'CSS styles prevent the word-spacing to be above the minimum value.';
        test.resultCode = 'RC4';
      }

      test.addElement(element, true, false, true);
      super.addTestResult(test);
    }
  }

  private parseStyle(style: string | null): string {
    if (style === null) {
      style = '';
    }
    const startLS = style.indexOf('word-spacing:');
    let endLS = style.indexOf(';', startLS);
    if (endLS === -1) {
      endLS = style.length;
    }
    return style?.substring(startLS + 13, endLS);
  }

  private isImportant(cssValue: any, element: typeof window.qwElement): boolean {
    if (cssValue.value === 'inherit' || cssValue.value === 'unset') {
      const parent = this.findParentWithCSSProperty(element.getElementParent());
      if (parent === null) return false;
      return this.isImportant(parent?.getCSSProperty('word-spacing'), parent);
    }
    return cssValue.important;
  }

  private isWide(wordSpacing: string, fontSize: string): boolean {
    const spacing = parseFloat(wordSpacing.slice(0, -2)); //remove px from end of string
    const font = parseFloat(fontSize.slice(0, -2));
    return spacing >= font * 0.16;
  }

  private isCascade(declaredStyle: string, computedStyle: any): boolean {
    return declaredStyle.includes(computedStyle.value);
  }

  private findParentWithCSSProperty(element: typeof window.qwElement | null): typeof window.qwElement | null {
    while (element !== null) {
      if (element?.getCSSProperty('word-spacing')) {
        return element;
      }
      element = element.getElementParent();
    }
    return null;
  }
}

export = QW_ACT_R69;
