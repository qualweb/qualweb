import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, IsInMainContext } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP28 extends BestPractice {
  @ElementExists
  @IsInMainContext
  execute(element: QWElement): void {
    let verdict;
    let resultCode;

    const candidates = element.getElements('h1, [role="heading"][aria-level="1"]');

    const accessibleH1s = candidates.filter(h1 => {
      return window.AccessibilityUtils.isElementInAT(h1);
    });

    const count = accessibleH1s.length;
    if (count === 1 ) {
      verdict = Verdict.PASSED;
      resultCode = 'P1';
      
    } else if (count > 1) {
      verdict = Verdict.FAILED;
      resultCode = 'F2';
    } else {
      const test = new Test();
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F1';
      return this.addTestResult(test);
    }

    candidates.forEach((element) => {
      const test = new Test();
      test.verdict = verdict;
      test.resultCode = resultCode;
      test.addElement(element)
      this.addTestResult(test);
    });
  }
}

export { QW_BP28 };
