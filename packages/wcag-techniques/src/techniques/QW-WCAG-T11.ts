import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@qualweb/common';
import { Test } from '@qualweb/common';
import { Verdict } from '@qualweb/common';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T11 extends Technique {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const alt = element.getElementAttribute('alt');

    if (alt === null) {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F1';
    } else if (alt?.trim() === '') {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F2';
    } else {
      const text = element.getElementText();
      if (text?.trim() !== '') {
        test.verdict = Verdict.WARNING;
        test.resultCode = 'W1';
      } else {
        test.verdict = Verdict.FAILED;
        test.resultCode = 'F3';
      }
    }

    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_WCAG_T11 };
