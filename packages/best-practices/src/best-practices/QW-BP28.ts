import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, Test } from '@qualweb/lib';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP28 extends BestPractice {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const hasH1 = element.getElements('h1');
    if (hasH1.length === 1) {
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

export { QW_BP28 };
