import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@qualweb/common';
import { Test } from '@qualweb/common';
import { Verdict } from '@qualweb/common';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T32 extends Technique {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const hasLi = element.getElements('li').length !== 0;
    const hasDd = element.getElements('dd').length !== 0;
    const hasDt = element.getElements('dt').length !== 0;

    const name = element.getElementTagName();

    if (hasLi && name === 'ul') {
      // fails if the element doesn't contain an alt attribute
      test.verdict = Verdict.WARNING;
      test.resultCode = 'W1';
    } else if (hasLi && name === 'ol') {
      test.verdict = Verdict.WARNING;
      test.resultCode = 'W2';
    } else if (name === 'dl' && (hasDt || hasDd)) {
      test.verdict = Verdict.WARNING;
      test.resultCode = 'W3';
    } else {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F1';
    }

    test.addElement(element, true, true);
    this.addTestResult(test);
  }
}

export { QW_WCAG_T32 };
