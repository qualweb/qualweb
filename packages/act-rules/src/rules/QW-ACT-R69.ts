import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementHasTextNode, ElementIsVisible } from '@shared/applicability';
import { Test } from '@shared/classes';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R69 extends AtomicRule {
  @ElementExists
  @ElementIsVisible
  @ElementHasTextNode
  execute(element: QWElement): void {
    const test = new Test();

    if (element.hasCSSProperty('word-spacing') || this.findParentWithCSSProperty(element) !== null) {
      const styleAttribute = element.getElementAttribute('style');
      const declaredWordSpacing = this.parseStyle(styleAttribute);
      const computedRawWordSpacing = element.getCSSProperty('word-spacing');
      const computedWordSpacing = element.getElementStyleProperty('word-spacing', null);
      const fontSize = element.getElementStyleProperty('font-size', null);

      if (element.hasCSSProperty('word-spacing') && !this.isImportant(computedRawWordSpacing, element)) {
        test.verdict = 'passed';
        test.resultCode = 'P1';
      } else if (this.isWide(computedWordSpacing, fontSize)) {
        test.verdict = 'passed';
        test.resultCode = 'P2';
      } else if (!this.isCascade(declaredWordSpacing, computedRawWordSpacing)) {
        test.verdict = 'passed';
        test.resultCode = 'P3';
      } else {
        test.verdict = 'failed';
        test.resultCode = 'F1';
      }

      test.addElement(element, true, false, true);
      this.addTestResult(test);
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

  private isImportant(cssValue: any, element: QWElement): boolean {
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
    if (computedStyle && computedStyle.value) {
      return declaredStyle.includes(computedStyle.value);
    }
    return false;
  }

  private findParentWithCSSProperty(element: QWElement | null): QWElement | null {
    while (element !== null) {
      if (element?.getCSSProperty('word-spacing')) {
        return element;
      }
      element = element.getElementParent();
    }
    return null;
  }
}

export { QW_ACT_R69 };
