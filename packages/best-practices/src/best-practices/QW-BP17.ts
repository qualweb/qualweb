import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass } from '../lib/applicability';
import Test from '../lib/Test.object';

@BestPracticeClass
class QW_BP17 extends BestPracticeObject {
  constructor(bestPractice: BestPractice) {
    super(bestPractice);
  }

  execute(element: typeof window.qwElement | undefined): void {
    const test = new Test();

    if (!element) {
      test.verdict = 'failed';
      test.description = `This page does not have links`;
      test.resultCode = 'RC1';
    } else {
      const refElement = window.DomUtils.getElementReferencedByHREF(element);

      if (refElement) {
        test.verdict = 'warning';
        test.description = 'This link skips a content block';
        test.resultCode = 'RC2';

        test.addElement(element);
        super.addTestResult(test);
      }
    }
  }
}

export = QW_BP17;
