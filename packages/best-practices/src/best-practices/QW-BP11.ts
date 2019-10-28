'use strict';

import { BestPractice as BestPracticeType, BestPracticeResult } from '@qualweb/best-practices';
import { DomElement } from 'htmlparser2';
import { DomUtils } from '@qualweb/util';

import BestPractice from './BestPractice.object';

const bestPractice: BestPracticeType = {
  name: 'Using br to make a list',
  code: 'QW-BP11',
  description: 'Using 3 consecutive br elements',
  metadata: {
    target: {
      element: 'br'
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

class QW_BP11 extends BestPractice {

  constructor() {
    super(bestPractice);
  }

  async execute(element: DomElement | undefined): Promise<void> {

    if (!element || !element.children) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };
    let result = 0;
    let hasBr = false;
    let type;
    for (let child of element.children) {
      type = child.type;
      if (child && child.name === "br") {
        result++;
        hasBr = true;
      } else if(type!=="text") {
        result = 0;
      }
    }

    if (result > 3) {
      evaluation.verdict = 'failed';
      evaluation.description = 'Br elements are being be used as a list';
      evaluation.resultCode = 'RC1';
    } else if (hasBr) {
      evaluation.verdict = 'passed';
      evaluation.description = 'There are less than 3 consecutive br.';
      evaluation.resultCode = 'RC2';
    }

    if (hasBr) {
      evaluation.htmlCode = DomUtils.transformElementIntoHtml(element);
      evaluation.pointer = DomUtils.getElementSelector(element);

      super.addEvaluationResult(evaluation);
    }
  }
}

export = QW_BP11;