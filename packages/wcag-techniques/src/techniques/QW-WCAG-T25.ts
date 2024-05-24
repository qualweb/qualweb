import type { QWElement } from '@packages/qw-element/src';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Verdict } from '@shared/types';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T25 extends Technique {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const name = element.getElementTagName();

    const hasScope = element.elementHasAttribute('scope');
    const scope = element.getElementAttribute('scope');

    if (name === 'th' && !hasScope) {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F1';
    } else if (name === 'th' && scope === '') {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F2';
    } else if (scope && ['col', 'row', 'colgroup', 'rowgroup'].includes(scope)) {
      test.verdict = Verdict.PASSED;
      test.resultCode = 'P1';
    } else {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F3';
    }

    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_WCAG_T25 };
