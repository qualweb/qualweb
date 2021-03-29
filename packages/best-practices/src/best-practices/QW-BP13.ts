import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';

@BestPracticeClass
class QW_BP13 extends BestPracticeObject {
  constructor(bestPractice: BestPractice) {
    super(bestPractice);
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

    if ((aWithImgNext && aWithImgNext.getElementAttribute('href') === href) || 
        (aWithImgPrev && aWithImgPrev.getElementAttribute('href') === href)) {
      test.verdict = 'failed';
      test.description = 'There are consecutive links with the same href in which one of the links contained an image';
      test.resultCode = 'RC1';
    } else {
      test.verdict = 'passed';
      test.description =
        'There are no consecutive links with the same href in which one of the links contained an image';
      test.resultCode = 'RC2';
    }

    if (aWithImg.getElementParent()) {
      test.addElement(element);
    }
    super.addTestResult(test);
  }
}

export = QW_BP13;
