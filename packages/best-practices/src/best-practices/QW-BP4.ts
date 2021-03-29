import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists, ElementIsNotChildOf } from '../lib/applicability';
import Test from '../lib/Test.object';

@BestPracticeClass
class QW_BP4 extends BestPracticeObject {
  constructor(bestPractice: BestPractice) {
    super(bestPractice);
  }

  @ElementExists
  @ElementIsNotChildOf('nav')
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const aCount = element.getNumberOfSiblingsWithTheSameTag();
    if (aCount >= 10) {
      test.verdict = 'failed';
      test.description = `It was found a group of 10 or more links not grouped within a nav element`;
      test.resultCode = 'RC1';
    } else {
      return;
    }

    if (element.getElementParent()) {
      test.addElement(element);
    }

    super.addTestResult(test);
  }
}

export = QW_BP4;
