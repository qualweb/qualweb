import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementHasChild } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP24 extends BestPractice {
  @ElementExists
  @ElementHasChild('*')
  execute(element: QWElement): void {
    const test = new Test();
    const children = element.getElementChildren();
    let allChildrenValid = true;
    children.map((child) => {
      const role = window.AccessibilityUtils.getElementRole(child);
      const name = child.getElementTagName();
      if (name !== 'li' && role !== 'listitem') {
        allChildrenValid = false;
      }
    });

    if (allChildrenValid) {
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

export { QW_BP24 };
