import type { QWElement } from '@packages/qw-element/src';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Verdict } from '@shared/types';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP21 extends BestPractice {
  @ElementExists
  execute(element: QWElement): void {
    const landmarkList = element.getElements('footer:not([role]), [role=contentinfo]');

    if (landmarkList.length > 0) {
      const test = new Test();
      if (landmarkList.length < 2) {
        test.verdict = Verdict.PASSED;
        test.resultCode = 'P1';
      } else {
        test.verdict = Verdict.FAILED;
        test.resultCode = 'F1';
      }
      test.addElements(landmarkList);
      super.addTestResult(test);
    }
  }
}

export { QW_BP21 };
