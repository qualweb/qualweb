import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T11 extends Technique {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const alt = element.getElementAttribute('alt');

    if (alt === null) {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    } else if (alt?.trim() === '') {
      test.verdict = 'failed';
      test.resultCode = 'F2';
    } else {
      const text = element.getElementText();
      if (text?.trim() !== '') {
        test.verdict = 'warning';
        test.resultCode = 'W1';
      } else {
        test.verdict = 'failed';
        test.resultCode = 'F3';
      }
    }

    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_WCAG_T11 };
