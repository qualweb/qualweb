import type { QWElement } from '@packages/qw-element/src';
import { ElementExists, ElementIsInAccessibilityTree } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Verdict } from '@shared/types';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP23 extends BestPractice {
  @ElementExists
  @ElementIsInAccessibilityTree
  execute(element: QWElement): void {
    const test = new Test();
    const parent = element.getElementParent();
    let isValidParent = false;
    const permittedNames = ['ul', 'ol', 'menu'];
    const parentName = parent?.getElementTagName();
    if (parentName) isValidParent = permittedNames.includes(parentName);

    if (isValidParent) {
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

export { QW_BP23 };
