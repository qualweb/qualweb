import { Test } from '@qualweb/common';
import { Verdict } from '@qualweb/common';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T22 extends Technique {

  execute(): void {
    throw new Error('Method not implemented.');
  }

  validate(newTabWasOpen: boolean): void {
    const test = new Test();

    if (!newTabWasOpen) {
      test.verdict = Verdict.PASSED;
      test.resultCode = 'P1';
    } else {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F1';
    }

    this.addTestResult(test);
  }
}

export { QW_WCAG_T22 };
