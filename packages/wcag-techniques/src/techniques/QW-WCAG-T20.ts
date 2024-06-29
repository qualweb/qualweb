import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementHasAttribute } from '@qualweb/common';
import { Test } from '@qualweb/common';
import { Verdict } from '@qualweb/common';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T20 extends Technique {

  @ElementExists
  @ElementHasAttribute('title')
  execute(element: QWElement): void {
    const test = new Test();

    const title = (<string>element.getElementAttribute('title')).trim();
    const text = element.getElementText().trim();

    if (!title) {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F1';
    } else if (title === text) {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F2';
    } else {
      test.verdict = Verdict.WARNING;
      test.resultCode = 'W1';
    }

    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_WCAG_T20 };
