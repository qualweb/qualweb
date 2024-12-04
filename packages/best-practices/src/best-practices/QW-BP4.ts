import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementIsNotChildOf } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP4 extends BestPractice {
  @ElementExists
  @ElementIsNotChildOf('nav')
  execute(element: QWElement): void {
    const aCount = element.getNumberOfSiblingsWithTheSameTag();
    if (aCount >= 10) {
      const test = new Test(Verdict.FAILED, undefined, 'F1');

      if (element.getElementParent()) {
        test.addElement(element);
      }

      this.addTestResult(test);
    }
  }
}

export { QW_BP4 };
