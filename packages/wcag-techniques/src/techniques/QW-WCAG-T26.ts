import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementHasAttributes, ElementIsVisible } from '@qualweb/common';
import { Test } from '@qualweb/common';
import { Verdict } from '@qualweb/common';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T26 extends Technique {
  @ElementExists
  @ElementHasAttributes
  @ElementIsVisible
  execute(element: QWElement): void {
    const test = new Test();

    if (window.AccessibilityUtils.isElementWidget(element)) {
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

export { QW_WCAG_T26 };
