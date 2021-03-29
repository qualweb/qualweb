import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass } from '../lib/applicability';
import Test from '../lib/Test.object';

@BestPracticeClass
class QW_BP10 extends BestPracticeObject {
  constructor(bestPractice: BestPractice) {
    super(bestPractice);
  }

  async execute(element: typeof window.qwElement | undefined): Promise<void> {
    const test = new Test();

    if (element === undefined) {
      test.verdict = 'passed';
      test.description = `The webpage doesn't use elements to control the visual content presentation`;
      test.resultCode = 'RC1';
    } else {
      const name = element.getElementTagName();
      test.verdict = 'failed';
      test.description = `The webpage uses the element ${name} to control the visual content presentation`;
      test.resultCode = 'RC2';
      test.attributes = name;
      test.addElement(element);
    }
    super.addTestResult(test);
  }
}

export = QW_BP10;
