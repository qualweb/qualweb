import type { QWElement } from '@qualweb/qw-element';
import { Test, Verdict } from '@qualweb/core/evaluation';
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
