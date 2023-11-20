import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@BestPracticeClass
class QW_BP7 extends BestPracticeObject {
  constructor(bestPractice: BestPractice, locale: Translate) {
    super(bestPractice, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const titleText = element.getElementText().replace(/\s/g, '');

    const regExp = new RegExp('@([[:punct:]]{4,})@iU');
    if (!regExp.test(titleText)) {
      test.verdict = 'passed';
      test.resultCode = `P1`;
    } else {
      test.verdict = 'failed';
      test.resultCode = `F1`;
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_BP7;
