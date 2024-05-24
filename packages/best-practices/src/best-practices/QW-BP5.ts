import type { QWElement } from '@packages/qw-element/src';
import { Test } from '@shared/classes';
import { Verdict } from '@shared/types';
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
