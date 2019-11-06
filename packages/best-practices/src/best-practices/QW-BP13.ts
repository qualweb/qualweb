'use strict';

import { BestPractice as BestPracticeType, BestPracticeResult } from '@qualweb/best-practices';
import { DomElement } from 'htmlparser2';
import { DomUtils } from '@qualweb/util';

import BestPractice from './BestPractice.object';

const bestPractice: BestPracticeType = {
  name: 'Using consecutive links with the same href and one contains an image',
  code: 'QW-BP13',
  description: 'Using consecutive links with the same href in which one of the links contains an image',
  metadata: {
    target: {
      element: 'a'
    },
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array<BestPracticeResult>()
};

class QW_BP13 extends BestPractice {

  constructor() {
    super(bestPractice);
  }

  async execute(element: DomElement | undefined): Promise<void> {

    if (!element || !element.parent) {
      return;
    }

    let aWithImg: DomElement | undefined = element.parent;
    let href = DomUtils.getElementAttribute(aWithImg, "href");
    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (aWithImg && aWithImg.next && (DomUtils.getElementAttribute(aWithImg.next, "href") === href)) {
      evaluation.verdict = 'failed';
      evaluation.description = 'There are consecutive links with the same href in which one of the links contained an image';
      evaluation.resultCode = 'RC1';

    } else if (aWithImg && aWithImg.prev && (DomUtils.getElementAttribute(aWithImg.prev, "href") === href)) {
      evaluation.verdict = 'failed';
      evaluation.description = 'There are consecutive links with the same href in which one of the links contained an image';
      evaluation.resultCode = 'RC1';

    } else {
      evaluation.verdict = 'passed';
      evaluation.description = 'There are no consecutive links with the same href in which one of the links contained an image';
      evaluation.resultCode = 'RC2';

    }

    if (aWithImg) {
      evaluation.htmlCode = DomUtils.transformElementIntoHtml(aWithImg.parent);
      evaluation.pointer = DomUtils.getElementSelector(aWithImg.parent);
    }

    super.addEvaluationResult(evaluation);

  }
}

export = QW_BP13;