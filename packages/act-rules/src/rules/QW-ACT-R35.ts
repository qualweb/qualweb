import type { QWElement } from '@packages/qw-element/src';
import { ElementExists, ElementHasOneOfTheFollowingRoles, ElementIsInAccessibilityTree } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Verdict } from '@shared/types';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R35 extends AtomicRule {
  @ElementExists
  @ElementHasOneOfTheFollowingRoles(['heading'])
  @ElementIsInAccessibilityTree
  execute(element: QWElement): void {
    const test = new Test();

    const accessibleName = window.AccessibilityUtils.getAccessibleName(element);
    if (accessibleName && accessibleName.trim() !== '') {
      test.verdict = Verdict.PASSED;
      test.resultCode = 'P1';
    } else {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F1';
    }

    test.addElement(element, true, true, true);
    this.addTestResult(test);
  }
}

export { QW_ACT_R35 };
