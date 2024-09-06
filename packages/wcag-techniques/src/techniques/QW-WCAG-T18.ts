import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@qualweb/common';
import { Test } from '@qualweb/common';
import { Verdict } from '@qualweb/common';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T18 extends Technique {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const has_th = element.getElements('th').length > 0;
    const has_tr = element.getElements('tr').length > 0;
    const has_td = element.getElements('td').length > 0;

    if (has_td && has_tr && has_th) {
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

export { QW_WCAG_T18 };
