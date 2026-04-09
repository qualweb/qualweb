import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP30 extends BestPractice {
  private readonly idMap = new Map<string, boolean>();

  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const id = element.getElementAttribute('id');

    if (id && !this.idMap.get(id)) {
      try {
        const elementsWithSameId = window.qwPage.getElements(`[id="${id}"]`, element);
        const visibleElementsWithSameId = elementsWithSameId.filter(el => (window.AccessibilityUtils.isElementInAT(el)));
        if (visibleElementsWithSameId.length > 1) {
          test.verdict = Verdict.FAILED;
          test.resultCode = 'F1';
        } else {
          test.verdict = Verdict.PASSED;
          test.resultCode = 'P1';
        }

        test.addElements(visibleElementsWithSameId);
        this.addTestResult(test);
      } finally {
        this.idMap.set(id, true);
      }
    }
  }
}

export { QW_BP30 };
