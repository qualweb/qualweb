import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@BestPracticeClass
class QW_BP17 extends BestPracticeObject {
  constructor(bestPractice: BestPractice, locale: Translate) {
    super(bestPractice, locale);
  }

  execute(element: typeof window.qwElement | undefined): void {
    const test = new Test();

    if (!element) {
      test.verdict = 'failed';
      test.resultCode = 'F1';
      super.addTestResult(test);
    } else {
      const refElement = window.DomUtils.getElementReferencedByHREF(element);

      if (refElement) {
        test.verdict = 'warning';
        test.resultCode = 'W1';

        test.addElement(element);
        test.addElement(refElement);
        super.addTestResult(test);
      }
    }
  }
}

export = QW_BP17;
