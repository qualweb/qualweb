import type { QWElement } from '@packages/qw-element/src';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Verdict } from '@shared/types';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T2 extends Technique {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const hasChild = element.elementHasChild('caption');
    const childText = element.getElementChildTextContent('caption');

    if (!hasChild || (childText && childText.trim() === '')) {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F1';
    } else {
      test.verdict = Verdict.WARNING;
      test.resultCode = 'W1';
    }

    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_WCAG_T2 };
