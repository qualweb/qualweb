import type { QWElement } from '@qualweb/qw-element';
import { Technique } from '../lib/Technique.object';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';

class QW_WCAG_T2 extends Technique {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const hasChild = element.elementHasChild('caption');
    const childText = element.getElementChildTextContent('caption');

    if (!hasChild || (childText && childText.trim() === '')) {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    } else {
      test.verdict = 'warning';
      test.resultCode = 'W1';
    }

    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_WCAG_T2 };
