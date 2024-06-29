import type { QWElement } from '@qualweb/qw-element';
import { Test } from '@qualweb/common';
import { Verdict } from '@qualweb/common';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP17 extends BestPractice {
  execute(element?: QWElement): void {
    const test = new Test();

    if (!element) {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F1';
      this.addTestResult(test);
    } else {
      const refElement = window.DomUtils.getElementReferencedByHREF(element);

      if (refElement) {
        test.verdict = Verdict.WARNING;
        test.resultCode = 'W1';

        test.addElement(element);
        test.addElement(refElement);
        this.addTestResult(test);
      }
    }
  }
}

export { QW_BP17 };
