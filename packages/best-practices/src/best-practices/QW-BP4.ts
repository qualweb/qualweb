import type { QWElement } from '@packages/qw-element/src';
import { ElementExists, ElementIsNotChildOf } from '@shared/applicability';
import { Test } from '@shared/classes';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP4 extends BestPractice {

  @ElementExists
  @ElementIsNotChildOf('nav')
  execute(element: QWElement): void {
    const aCount = element.getNumberOfSiblingsWithTheSameTag();
    if (aCount >= 10) {
      const test = new Test('failed', undefined, 'F1');

      if (element.getElementParent()) {
        test.addElement(element);
      }

      this.addTestResult(test);
    }
  }
}

export { QW_BP4 };
