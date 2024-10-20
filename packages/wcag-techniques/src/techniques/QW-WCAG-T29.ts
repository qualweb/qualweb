import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T29 extends Technique {
  @ElementExists
  execute(element: QWElement): void {
    if (element.getElementTagName() === 'style') {
      const sheet = element.getElementProperty('sheet') as unknown as CSSStyleSheet;
      for (const rule of sheet.cssRules || []) {
        const style = (rule as CSSStyleRule)?.style?.cssText;
        if (style) {
          this.checkCssProperty(style, element);
        }
      }
    } else {
      const style = element.getElementAttribute('style');
      if (style) {
        this.checkCssProperty(style, element);
      }
    }
  }

  private checkCssProperty(style: string, element: QWElement): void {
    const properties = style.split(';').filter((p) => p.trim() !== '') || [style];

    for (const property of properties) {
      if (property.includes('text-align')) {
        const textAlign = property.split(':')[1];
        const isJustified = textAlign.includes('justify');

        const test = new Test();

        if (!isJustified) {
          test.verdict = Verdict.PASSED;
          test.resultCode = 'P1';
        } else {
          test.verdict = Verdict.FAILED;
          test.resultCode = 'F1';
        }

        test.addElement(element);
        test.attributes.push(property);

        this.addTestResult(test);
      }
    }
  }
}

export { QW_WCAG_T29 };
