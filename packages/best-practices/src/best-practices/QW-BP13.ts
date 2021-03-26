import { BestPractice, BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';

@BestPracticeClass
class QW_BP13 extends BestPracticeObject {
  constructor(bestPractice: BestPractice) {
    super(bestPractice);
  }

  @ElementExists
  execute(element: QWElement): void {
    const aWithImg = element.getElementParent();

    if (!aWithImg) {
      return;
    }

    const href = aWithImg.getElementAttribute('href');

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const aWithImgNext = aWithImg.getElementNextSibling();

    const aWithImgPrev = aWithImg.getElementPreviousSibling();

    if (aWithImg && aWithImgNext && aWithImgNext.getElementAttribute('href') === href) {
      evaluation.verdict = 'failed';
      evaluation.description =
        'There are consecutive links with the same href in which one of the links contained an image';
      evaluation.resultCode = 'RC1';
    } else if (aWithImg && aWithImgPrev && aWithImgPrev.getElementAttribute('href') === href) {
      evaluation.verdict = 'failed';
      evaluation.description =
        'There are consecutive links with the same href in which one of the links contained an image';
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'passed';
      evaluation.description =
        'There are no consecutive links with the same href in which one of the links contained an image';
      evaluation.resultCode = 'RC2';
    }

    super.addEvaluationResult(evaluation, aWithImg && aWithImg.getElementParent() ? element : undefined);
  }
}

export = QW_BP13;
