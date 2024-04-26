import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementHasAttributeRole, ElementIsInAccessibilityTree } from '@shared/applicability';
import { Test } from '@shared/classes';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R11 extends AtomicRule {
  @ElementExists
  @ElementIsInAccessibilityTree
  @ElementHasAttributeRole('button')
  execute(element: QWElement): void {
    const accessibleName = window.AccessibilityUtils.getAccessibleName(element);

    const test = new Test();

    if (accessibleName && accessibleName.trim() !== '') {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }

    test.addElement(element, true, true, true);
    this.addTestResult(test);
  }
}

export { QW_ACT_R11 };
