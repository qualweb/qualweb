import type { QWElement } from '@packages/qw-element/src';
import { Test } from '@shared/classes';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP17 extends BestPractice {
  execute(element?: QWElement): void {
    const test = new Test();

    if (!element) {
      test.verdict = 'failed';
      test.resultCode = 'F1';
      this.addTestResult(test);
    } else {
      const refElement = window.DomUtils.getElementReferencedByHREF(element);

      if (refElement) {
        test.verdict = 'warning';
        test.resultCode = 'W1';

        test.addElement(element);
        test.addElement(refElement);
        this.addTestResult(test);
      }
    }
  }
}

export { QW_BP17 };
