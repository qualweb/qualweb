import type { QWElement } from '@packages/qw-element/src';
import { ElementExists, IsHTMLDocument, ElementIsInAccessibilityTree } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Verdict } from '@shared/types';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R6 extends AtomicRule {
  @ElementExists
  @IsHTMLDocument
  @ElementIsInAccessibilityTree
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

export { QW_ACT_R6 };
