import type { QWElement } from '@packages/qw-element/src';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R48 extends AtomicRule {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const isInAT = window.AccessibilityUtils.isElementInAT(element);
    if (!isInAT) {
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

export { QW_ACT_R48 };
