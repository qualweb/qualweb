import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementIsInAccessibilityTree, ElementIsSemanticLink } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R12 extends AtomicRule {
  @ElementExists
  @ElementIsInAccessibilityTree
  @ElementIsSemanticLink
  execute(element: QWElement): void {
    const accessibleName = window.AccessibilityUtils.getAccessibleName(element);

    const test = new Test();

    if (accessibleName && accessibleName.trim() !== '') {
      test.verdict = Verdict.PASSED;
      test.resultCode = 'P1';
    } else {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F1';
    }

    test.addElement(element, true, false, true);
    this.addTestResult(test);
  }
}

export { QW_ACT_R12 };
