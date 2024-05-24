import type { QWElement } from '@packages/qw-element/src';
import { Test } from '@shared/classes';
import { Verdict } from '@shared/types';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP10 extends BestPractice {
  async execute(element?: QWElement): Promise<void> {
    const test = new Test();

    if (element === undefined) {
      test.verdict = Verdict.PASSED;
      test.resultCode = 'P1';
    } else {
      const name = element.getElementTagName();
      test.verdict = Verdict.FAILED;
      test.description = this.translate('F1', { name });
      test.resultCode = 'F1';
      test.attributes.push(name);
      test.addElement(element);
    }
    this.addTestResult(test);
  }
}

export { QW_BP10 };
