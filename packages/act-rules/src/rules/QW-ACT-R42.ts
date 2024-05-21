import type { QWElement } from '@packages/qw-element/src';
import { ElementExists, ElementIsInAccessibilityTree, ElementIsNonText } from '@shared/applicability';
import { Test } from '@shared/classes';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R42 extends AtomicRule {
  @ElementExists
  @ElementIsInAccessibilityTree
  @ElementIsNonText
  execute(element: QWElement): void {
    const test = new Test();

    const accessibleName = window.AccessibilityUtils.getAccessibleName(element);
    if (accessibleName && accessibleName.trim() !== '') {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }

    test.addElement(element, true, false, true);
    this.addTestResult(test);
  }
}

export { QW_ACT_R42 };
