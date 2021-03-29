import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists, ElementHasAttribute, ElementHasNonEmptyAttribute } from '../lib/applicability';
import Test from '../lib/Test.object';

@BestPracticeClass
class QW_BP2 extends BestPracticeObject {
  constructor(bestPractice: BestPractice) {
    super(bestPractice);
  }

  @ElementExists
  @ElementHasAttribute('alt')
  @ElementHasNonEmptyAttribute('alt')
  async execute(element: typeof window.qwElement): Promise<void> {
    const test = new Test();

    const altValue = element.getElementAttribute('alt');

    if (!altValue || altValue === '') {
      test.verdict = 'inapplicable';
      test.description = 'The img alt text attribute is empty';
      test.resultCode = 'RC1';
    } else if (altValue.trim().length > 100) {
      test.verdict = 'failed';
      test.description = 'The img alt text attribute has more than 100 characters';
      test.resultCode = 'RC2';
    } else {
      test.verdict = 'passed';
      test.description = 'The img alt text attribute has less than 100 characters';
      test.resultCode = 'RC3';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_BP2;
