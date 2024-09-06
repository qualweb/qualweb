import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@qualweb/common';
import { Test } from '@qualweb/common';
import { Verdict } from '@qualweb/common';
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
