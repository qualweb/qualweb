import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementIsInAccessibilityTree, Test } from '@qualweb/lib';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP23 extends BestPractice {
  @ElementExists
  @ElementIsInAccessibilityTree
  execute(element: QWElement): void {
    const test = new Test();
    const parent = element.getElementParent();
    let isValidParent = false;
    const permitedNames = ['ul', 'ol', 'menu'];
    const parentName = parent?.getElementTagName();
    if (parentName) isValidParent = permitedNames.includes(parentName);

    if (isValidParent) {
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

export { QW_BP23 };
