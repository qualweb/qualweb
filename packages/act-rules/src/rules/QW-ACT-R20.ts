import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementHasNonEmptyAttribute, ElementIsNotHidden, Test } from '@qualweb/lib';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R20 extends AtomicRule {

  @ElementExists
  @ElementHasNonEmptyAttribute('role')
  @ElementIsNotHidden
  execute(element: QWElement): void {
    const test = new Test();

    if (window.AccessibilityUtils.elementHasValidRole(element)) {
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

export { QW_ACT_R20 };
