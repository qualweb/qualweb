import type { QWElement } from '@packages/qw-element/src';
import { Test } from '@shared/classes';
import { Verdict } from '@shared/types';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T13 extends Technique {
  execute(element?: QWElement): void {
    const test = new Test();

    if (element) {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F1';
      test.addElement(element);
    } else {
      test.verdict = Verdict.PASSED;
      test.resultCode = 'P1';
    }

    this.addTestResult(test);
  }
}

export { QW_WCAG_T13 };
