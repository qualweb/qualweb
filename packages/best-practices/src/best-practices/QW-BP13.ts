'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPractice, ElementExists } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';

@BestPractice
class QW_BP13 extends BestPracticeObject {
  constructor(bestPractice?: any) {
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

    if (aWithImg) {
      const aWithImgParent = aWithImg.getElementParent();
      if (aWithImgParent) {
        evaluation.htmlCode = aWithImgParent.getElementHtmlCode(true, true);
        evaluation.pointer = aWithImgParent.getElementSelector();
      }
    }

    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP13;
