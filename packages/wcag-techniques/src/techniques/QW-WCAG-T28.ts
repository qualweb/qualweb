import type { CSSProperties, QWElement } from '@packages/qw-element/src';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T28 extends Technique {
  @ElementExists
  execute(element: QWElement): void {
    const cssRules = element.getCSSRules();
    this.checkCssProperty(cssRules, element);
  }

  private checkCssProperty(cssRules: CSSProperties | undefined, element: QWElement): void {
    const test = new Test();
    const fontSize = cssRules?.['font-size'];
    if (fontSize) {
      const value = fontSize.value + '';
      const hasAbsoluteUnit =
        value.includes('cm') ||
        value.includes('mm') ||
        value.includes('in') ||
        value.includes('px') ||
        value.includes('pt') ||
        value.includes('pc');

      if (!hasAbsoluteUnit) {
        test.verdict = 'passed';
        test.resultCode = 'P1';
      } else {
        test.verdict = 'failed';
        test.resultCode = 'F1';
      }

      test.addElement(element);
      test.attributes.push(value);

      this.addTestResult(test);
    }
  }
}

export { QW_WCAG_T28 };
