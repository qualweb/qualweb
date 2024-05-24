import type { QWElement } from '@packages/qw-element/src';
import { ElementExists, ElementHasTextNode, ElementIsVisible } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Verdict } from '@shared/types';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R68 extends AtomicRule {
  @ElementExists
  @ElementIsVisible
  @ElementHasTextNode
  execute(element: QWElement): void {
    const test = new Test();

    if (element.hasCSSProperty('line-height') || this.findParentWithCSSProperty(element) !== null) {
      const styleAttribute = element.getElementAttribute('style');
      const declaredLineHeight = this.parseStyle(styleAttribute);
      const computedRawLineHeight = element.getCSSProperty('line-height');
      const computedLineHeight = element.getElementStyleProperty('line-height', null);
      const fontSize = element.getElementStyleProperty('font-size', null);
      const numLines = this.computeLineNumber(element, computedLineHeight);

      if (numLines < 2) {
        // no soft-wrap
        return;
      }

      if (element.hasCSSProperty('line-height') && !this.isImportant(computedRawLineHeight, element)) {
        test.verdict = Verdict.PASSED;
        test.resultCode = 'P1';
      } else if (!this.isNormal(computedLineHeight, element) && this.isLarge(computedLineHeight, fontSize)) {
        test.verdict = Verdict.PASSED;
        test.resultCode = 'P2';
      } else if (!this.isCascade(declaredLineHeight, computedRawLineHeight)) {
        test.verdict = Verdict.PASSED;
        test.resultCode = 'P3';
      } else {
        test.verdict = Verdict.FAILED;
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
    const startLS = style.indexOf('line-height:');
    let endLS = style.indexOf(';', startLS);
    if (endLS === -1) {
      endLS = style.length;
    }
    return style.substring(startLS + 12, endLS);
  }

  private isImportant(cssValue: any, element: QWElement): boolean {
    if (cssValue.value === 'inherit' || cssValue.value === 'unset') {
      const parent = this.findParentWithCSSProperty(element.getElementParent());
      if (parent === null) return false;
      return this.isImportant(parent?.getCSSProperty('line-height'), parent);
    }
    return cssValue.important;
  }

  private isNormal(cssValue: any, element: QWElement): boolean {
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
    if (computedStyle && computedStyle.value) {
      return declaredStyle.includes(computedStyle.value);
    }
    return false;
  }

  private findParentWithCSSProperty(element: QWElement | null): QWElement | null {
    while (element !== null) {
      if (element?.getCSSProperty('line-height')) {
        return element;
      }
      element = element.getElementParent();
    }
    return null;
  }

  private computeLineNumber(element: QWElement, lineHeight: string): number {
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

export { QW_ACT_R68 };
