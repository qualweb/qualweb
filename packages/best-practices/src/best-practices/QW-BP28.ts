import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP28 extends BestPractice {
  @ElementExists
  execute(element: QWElement): void {
    let verdict;
    let resultCode;

    const hasH1 = element.getElements('h1');
    if (hasH1.length === 1) {
      verdict = Verdict.PASSED;
      resultCode = 'P1';
    } else {
      verdict = Verdict.FAILED;
      resultCode = 'F1';
    }
    hasH1.forEach((element) => {
      const test = new Test();
      test.verdict = verdict;
      test.resultCode = resultCode;
      test.addElement(element)
      this.addTestResult(test);
    });
  }
}

export { QW_BP28 };
