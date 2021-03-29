import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists, ElementHasChild } from '../lib/applicability';
import Test from '../lib/Test.object';

@BestPracticeClass
class QW_BP11 extends BestPracticeObject {
  constructor(bestPractice: BestPractice) {
    super(bestPractice);
  }

  @ElementExists
  @ElementHasChild('*')
  execute(element: typeof window.qwElement): void {
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

    if (result > 3) {
      test.verdict = 'failed';
      test.description = 'Br elements are being be used as a list';
      test.resultCode = 'RC1';
    } else if (hasBr) {
      test.verdict = 'passed';
      test.description = 'There are less than 3 consecutive br.';
      test.resultCode = 'RC2';
    }

    if (hasBr) {
      test.addElement(element);
      super.addTestResult(test);
    }
  }
}

export = QW_BP11;
