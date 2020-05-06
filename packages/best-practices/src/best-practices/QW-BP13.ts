'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import { ElementHandle } from 'puppeteer';
import { DomUtils } from '@qualweb/util';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPractice, ElementExists } from '../lib/decorator';

@BestPractice
class QW_BP13 extends BestPracticeObject {

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  @ElementExists
  async execute(element: ElementHandle): Promise<void> {

    const aWithImg = await DomUtils.getElementParent(element);

    if (!aWithImg) {
      return;
    }

    const href = await DomUtils.getElementAttribute(aWithImg, 'href');

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const aWithImgNext = (await aWithImg.evaluateHandle(elem => {
      return elem.nextElementSibling;
    })).asElement();

    const aWithImgPrev = (await aWithImg.evaluateHandle(elem => {
      return elem.previousElementSibling;
    })).asElement();

    if (aWithImg && aWithImgNext && (await DomUtils.getElementAttribute(aWithImgNext, 'href') === href)) {
      evaluation.verdict = 'failed';
      evaluation.description = 'There are consecutive links with the same href in which one of the links contained an image';
      evaluation.resultCode = 'RC1';
    } else if (aWithImg && aWithImgPrev && (await DomUtils.getElementAttribute(aWithImgPrev, 'href') === href)) {
      evaluation.verdict = 'failed';
      evaluation.description = 'There are consecutive links with the same href in which one of the links contained an image';
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'passed';
      evaluation.description = 'There are no consecutive links with the same href in which one of the links contained an image';
      evaluation.resultCode = 'RC2';
    }

    if (aWithImg) {
      const aWithImgParent = await DomUtils.getElementParent(aWithImg);
      if (aWithImgParent) {
        evaluation.htmlCode = await DomUtils.getElementHtmlCode(aWithImgParent, true, true);
        evaluation.pointer = await DomUtils.getElementSelector(aWithImgParent);
      }
    }

    await super.addEvaluationResult(evaluation);
  }
}

export = QW_BP13;
