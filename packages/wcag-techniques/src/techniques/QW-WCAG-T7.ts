import type { QWElement } from '@packages/qw-element/src';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Verdict } from '@shared/types';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T7 extends Technique {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const title = element.getElementAttribute('title');

    if (title && title.trim() !== '') {
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

export { QW_WCAG_T7 };
