import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementHasChild, Test } from '@qualweb/lib';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP11 extends BestPractice {
  @ElementExists
  @ElementHasChild('*')
  execute(element: QWElement): void {
    const test = new Test();

    let result = 0;
    let hasBr = false;

    for (const child of element.getElementChildren() || []) {
      const type = child.getElementType();
      if (child && child.getElementTagName() === 'br') {
        result++;
        hasBr = true;
      } else if (type !== 'text') {
        result = 0;
      }
    }

    if (hasBr && result <= 3) {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else if (hasBr) {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }

    if (hasBr) {
      test.addElement(element);
      this.addTestResult(test);
    }
  }
}

export { QW_BP11 };
