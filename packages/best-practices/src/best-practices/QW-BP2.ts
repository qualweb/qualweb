import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementHasAttribute, ElementHasNonEmptyAttribute } from '@qualweb/common';
import { Test } from '@qualweb/common';
import { Verdict } from '@qualweb/common';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP2 extends BestPractice {
  @ElementExists
  @ElementHasAttribute('alt')
  @ElementHasNonEmptyAttribute('alt')
  async execute(element: QWElement): Promise<void> {
    const test = new Test();

    const altValue = <string>element.getElementAttribute('alt');

    if (altValue.trim().length <= 100) {
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

export { QW_BP2 };
