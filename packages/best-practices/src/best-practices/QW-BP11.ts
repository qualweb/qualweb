import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists, ElementHasChild } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@BestPracticeClass
class QW_BP11 extends BestPracticeObject {
  constructor(bestPractice: BestPractice, locale: Translate) {
    super(bestPractice, locale);
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

    if (hasBr && result <= 3) {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else if (hasBr) {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }

    if (hasBr) {
      test.addElement(element);
      super.addTestResult(test);
    }
  }
}

export = QW_BP11;
