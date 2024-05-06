import type { QWElement } from '@packages/qw-element/src';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';
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
      test.verdict = 'warning';
      test.resultCode = 'W1';
    } else if (hasLi && name === 'ol') {
      test.verdict = 'warning';
      test.resultCode = 'W2';
    } else if (name === 'dl' && (hasDt || hasDd)) {
      test.verdict = 'warning';
      test.resultCode = 'W3';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }

    test.addElement(element, true, true);
    this.addTestResult(test);
  }
}

export { QW_WCAG_T32 };
