import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists, ElementDoesNotHaveChild } from '../lib/applicability';
import Test from '../lib/Test.object';

@BestPracticeClass
class QW_BP9 extends BestPracticeObject {
  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  @ElementExists
  @ElementDoesNotHaveChild('th')
  async execute(element: typeof window.qwElement): Promise<void> {
    const test = new Test();

    const headers = element.getElements('th');

    if (headers.length === 0) {
      const caption = element.getElements('caption');

      if (caption.length !== 0) {
        test.verdict = 'passed';
        test.description = `Table doesn't have header cells but has a caption`;
        test.resultCode = 'RC1';
      } else {
        test.verdict = 'failed';
        test.description = `Table doesn't have header cells or caption`;
        test.resultCode = 'RC2';
      }
    } else {
      test.verdict = 'inapplicable';
      test.description = `Table has header cells`;
      test.resultCode = 'RC3';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_BP9;
