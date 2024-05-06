import type { QWElement } from '@packages/qw-element/src';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP21 extends BestPractice {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const landmarkList = element.getElements('footer:not([role]), [role=contentinfo]');

    if (landmarkList.length < 2) {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }
    test.addElements(landmarkList);
    this.addTestResult(test);
  }
}

export { QW_BP21 };
