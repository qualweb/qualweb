import type { QWElement } from '@packages/qw-element/src';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T27 extends Technique {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const alignAttribute = element.getElementAttribute('align');

    if (alignAttribute) {
      if (alignAttribute.trim().toLowerCase() === 'justify') {
        test.verdict = 'failed';
        test.resultCode = 'F1';
      } else {
        test.verdict = 'passed';
        test.resultCode = 'P1';
      }

      test.addElement(element);
      this.addTestResult(test);
    }
  }
}

export { QW_WCAG_T27 };
