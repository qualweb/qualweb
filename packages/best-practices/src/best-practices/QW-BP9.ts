import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementDoesNotHaveChild } from '@shared/applicability';
import { Test } from '@shared/classes';
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
        test.verdict = 'passed';
        test.resultCode = 'P1';
      } else {
        test.verdict = 'failed';
        test.resultCode = 'F1';
      }

      test.addElement(element);
      this.addTestResult(test);
    }
  }
}

export { QW_BP9 };
