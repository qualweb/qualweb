import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@qualweb/common';
import { Test } from '@qualweb/common';
import { Verdict } from '@qualweb/common';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP28 extends BestPractice {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const hasH1 = element.getElements('h1');
    if (hasH1.length === 1) {
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

export { QW_BP28 };
