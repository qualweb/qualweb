import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@BestPracticeClass
class QW_BP13 extends BestPracticeObject {
  constructor(bestPractice: BestPractice, locale: Translate) {
    super(bestPractice, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const aWithImg = element.getElementParent();

    if (!aWithImg) {
      return;
    }

    const test = new Test();

    const href = aWithImg.getElementAttribute('href');
    const aWithImgNext = aWithImg.getElementNextSibling();
    const aWithImgPrev = aWithImg.getElementPreviousSibling();

    if (
      (aWithImgNext && aWithImgNext.getElementAttribute('href') === href) ||
      (aWithImgPrev && aWithImgPrev.getElementAttribute('href') === href)
    ) {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    } else {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    }

    if (aWithImg.getElementParent()) {
      test.addElement(element);
    }
    super.addTestResult(test);
  }
}

export = QW_BP13;
