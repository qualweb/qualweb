import type { CSSProperties, QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@qualweb/common';
import { Test } from '@qualweb/common';
import { Verdict } from '@qualweb/common';
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
        test.verdict = Verdict.PASSED;
        test.resultCode = 'P1';
      } else {
        test.verdict = Verdict.FAILED;
        test.resultCode = 'F1';
      }

      test.addElement(element);
      test.attributes.push(value);

      this.addTestResult(test);
    }
  }
}

export { QW_WCAG_T28 };
