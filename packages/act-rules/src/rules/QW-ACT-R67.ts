import type { QWElement } from '@packages/qw-element/src';
import { ElementExists, ElementHasTextNode, ElementIsVisible } from '@shared/applicability';
import { Test } from '@shared/classes';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R67 extends AtomicRule {
  @ElementExists
  @ElementIsVisible
  @ElementHasTextNode
  execute(element: QWElement): void {
    if (element.hasCSSProperty('letter-spacing') || this.findParentWithCSSProperty(element) !== null) {
      const styleAttribute = element.getElementAttribute('style');
      const declaredLetterSpacing = this.parseStyle(styleAttribute);
      const computedRawLetterSpacing = element.getCSSProperty('letter-spacing');
      const computedLetterSpacing = element.getElementStyleProperty('letter-spacing', null);
      const fontSize = element.getElementStyleProperty('font-size', null);

      const test = new Test();

      if (element.hasCSSProperty('letter-spacing') && !this.isImportant(computedRawLetterSpacing, element)) {
        test.verdict = 'passed';
        test.resultCode = 'P1';
      } else if (this.isWide(computedLetterSpacing, fontSize)) {
        test.verdict = 'passed';
        test.resultCode = 'P2';
      } else if (!this.isCascade(declaredLetterSpacing, computedRawLetterSpacing)) {
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
    const startLS = style.indexOf('letter-spacing:');
    let endLS = style.indexOf(';', startLS);
    if (endLS === -1) {
      endLS = style.length;
    }
    return style?.substring(startLS + 15, endLS);
  }

  private isImportant(cssValue: any, element: QWElement): boolean {
    if (cssValue.value === 'inherit' || cssValue.value === 'unset') {
      const parent = this.findParentWithCSSProperty(element.getElementParent());
      if (parent === null) return false;
      return this.isImportant(parent?.getCSSProperty('letter-spacing'), parent);
    }
    return cssValue.important;
  }

  private isWide(letterSpacing: string, fontSize: string): boolean {
    const letter = parseFloat(letterSpacing.slice(0, -2)); //remove px from end of string
    const font = parseFloat(fontSize.slice(0, -2));
    return letter >= font * 0.12;
  }

  private isCascade(declaredStyle: string, computedStyle: any): boolean {
    if (declaredStyle.trim().length > 0 && computedStyle && computedStyle.value) {
      return declaredStyle.includes(computedStyle.value);
    }
    return false;
  }

  private findParentWithCSSProperty(element: QWElement | null): QWElement | null {
    while (element !== null) {
      if (element?.getCSSProperty('letter-spacing')) {
        return element;
      }
      element = element.getElementParent();
    }
    return null;
  }
}

export { QW_ACT_R67 };
