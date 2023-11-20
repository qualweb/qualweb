import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists, ElementIsNotChildOf } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@BestPracticeClass
class QW_BP4 extends BestPracticeObject {
  constructor(bestPractice: BestPractice, locale: Translate) {
    super(bestPractice, locale);
  }

  @ElementExists
  @ElementIsNotChildOf('nav')
  execute(element: typeof window.qwElement): void {
    const aCount = element.getNumberOfSiblingsWithTheSameTag();
    if (aCount >= 10) {
      const test = new Test('failed', undefined, 'F1');

      if (element.getElementParent()) {
        test.addElement(element);
      }

      super.addTestResult(test);
    }
  }
}

export = QW_BP4;
