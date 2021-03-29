import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';

@BestPracticeClass
class QW_BP6 extends BestPracticeObject {
  constructor(bestPractice: BestPractice) {
    super(bestPractice);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const MAX_LENGTH_TITLE = 100;

    const titleValue = element.getElementText();

    if (titleValue.length > MAX_LENGTH_TITLE) {
      test.verdict = 'failed';
      test.description = `The page title has more than ` + MAX_LENGTH_TITLE + ` characters`;
      test.resultCode = 'RC1';
    } else {
      test.verdict = 'passed';
      test.description = `The page title has less than ` + MAX_LENGTH_TITLE + ` characters`;
      test.resultCode = 'RC2';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_BP6;
