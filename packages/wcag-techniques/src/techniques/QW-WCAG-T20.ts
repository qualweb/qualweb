import type { QWElement } from '@packages/qw-element/src';
import { ElementExists, ElementHasAttribute } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T20 extends Technique {

  @ElementExists
  @ElementHasAttribute('title')
  execute(element: QWElement): void {
    const test = new Test();

    const title = (<string>element.getElementAttribute('title')).trim();
    const text = element.getElementText().trim();

    if (!title) {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    } else if (title === text) {
      test.verdict = 'failed';
      test.resultCode = 'F2';
    } else {
      test.verdict = 'warning';
      test.resultCode = 'W1';
    }

    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_WCAG_T20 };
