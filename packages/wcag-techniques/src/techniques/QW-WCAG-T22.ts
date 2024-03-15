import { Test } from '@qualweb/lib';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T22 extends Technique {

  execute(): void {
    throw new Error('Method not implemented.');
  }

  validate(newTabWasOpen: boolean): void {
    const test = new Test();

    if (!newTabWasOpen) {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }

    this.addTestResult(test);
  }
}

export { QW_WCAG_T22 };
