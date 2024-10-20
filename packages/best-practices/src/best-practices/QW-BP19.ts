import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementHasAttributeRole } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP19 extends BestPractice {
  @ElementExists
  @ElementHasAttributeRole('banner')
  execute(element: QWElement): void {
    const test = new Test();

    const isTopLevel = window.AccessibilityUtils.landmarkIsTopLevel(element);
    if (isTopLevel) {
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

export { QW_BP19 };
