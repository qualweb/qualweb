import type { QWElement } from '@packages/qw-element/src';
import { ElementExists, ElementDoesNotHaveChild } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Verdict } from '@shared/types';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP9 extends BestPractice {
  @ElementExists
  @ElementDoesNotHaveChild('th')
  async execute(element: QWElement): Promise<void> {
    const headers = element.getElements('th');

    if (headers.length === 0) {
      const caption = element.getElements('caption');

      const test = new Test();

      if (caption.length !== 0) {
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
}

export { QW_BP9 };
