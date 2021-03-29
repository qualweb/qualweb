import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass } from '../lib/applicability';
import Test from '../lib/Test.object';

@BestPracticeClass
class QW_BP5 extends BestPracticeObject {
  constructor(bestPractice: BestPractice) {
    super(bestPractice);
  }

  execute(element: typeof window.qwElement | undefined): void {
    const test = new Test();

    if (!element) {
      test.verdict = 'passed';
      test.description = 'There are not table elements inside other table elements';
      test.resultCode = 'RC1';
    } else {
      test.verdict = 'failed';
      test.description = 'There are table elements inside other table elements';
      test.resultCode = 'RC2';
      test.addElement(element);
    }

    super.addTestResult(test);
  }
}

export = QW_BP5;
