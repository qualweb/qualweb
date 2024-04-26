import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementHasAttributeRole } from '@shared/applicability';
import { Test } from '@shared/classes';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP19 extends BestPractice {
  @ElementExists
  @ElementHasAttributeRole('banner')
  execute(element: QWElement): void {
    const test = new Test();

    const isTopLevel = window.AccessibilityUtils.landmarkIsTopLevel(element);
    if (isTopLevel) {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }
    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_BP19 };
