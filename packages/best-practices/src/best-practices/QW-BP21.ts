import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@qualweb/common';
import { Test } from '@qualweb/common';
import { Verdict } from '@qualweb/common';
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
