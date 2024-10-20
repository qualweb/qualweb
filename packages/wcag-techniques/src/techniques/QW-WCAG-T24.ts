import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T24 extends Technique {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const isFocusable = window.AccessibilityUtils.isElementFocusable(element);

    if (isFocusable) {
      const keepsFocus = window.AccessibilityUtils.isFocusableBrowser(element);
      if (keepsFocus) {
        test.verdict = Verdict.PASSED;
        test.resultCode = 'P1';
      } else {
        test.verdict = Verdict.FAILED;
        test.resultCode = 'F1';
      }

      test.addElement(element);
      this.addTestResult(test);
    }
  }
}

export { QW_WCAG_T24 };
