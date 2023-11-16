import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists, ElementDoesNotHaveChild } from '../lib/applicability';
import Test from '../lib/Test.object';
import { BestPractice } from '@qualweb/best-practices';
import { Translate } from '@qualweb/locale';

@BestPracticeClass
class QW_BP9 extends BestPracticeObject {
  constructor(bestPractice: BestPractice, locale: Translate) {
    super(bestPractice, locale);
  }

  @ElementExists
  @ElementDoesNotHaveChild('th')
  async execute(element: typeof window.qwElement): Promise<void> {
    const headers = element.getElements('th');

    if (headers.length === 0) {
      const caption = element.getElements('caption');

      const test = new Test();

      if (caption.length !== 0) {
        test.verdict = 'passed';
        test.resultCode = 'P1';
      } else {
        test.verdict = 'failed';
        test.resultCode = 'F1';
      }

      test.addElement(element);
      super.addTestResult(test);
    }
  }
}

export = QW_BP9;
