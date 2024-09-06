import type { QWElement } from '@qualweb/qw-element';
import { Test } from '@qualweb/common';
import { Verdict } from '@qualweb/common';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP5 extends BestPractice {
  execute(element?: QWElement): void {
    const test = new Test();

    if (!element) {
      test.verdict = Verdict.PASSED;
      test.resultCode = 'P1';
    } else {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F1';
      test.addElement(element);
    }

    this.addTestResult(test);
  }
}

export { QW_BP5 };
