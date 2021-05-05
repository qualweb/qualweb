import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@BestPracticeClass
class QW_BP10 extends BestPracticeObject {
  constructor(bestPractice: BestPractice, locale: Translate) {
    super(bestPractice, locale);
  }

  async execute(element: typeof window.qwElement | undefined): Promise<void> {
    const test = new Test();

    if (element === undefined) {
      test.verdict = 'passed';
      test.resultCode = 'RC1';
    } else {
      const name = element.getElementTagName();
      test.verdict = 'failed';
      test.description = super.getTranslation('RC2', { name });
      test.resultCode = 'RC2';
      test.attributes = name;
      test.addElement(element);
    }
    super.addTestResult(test);
  }
}

export = QW_BP10;
