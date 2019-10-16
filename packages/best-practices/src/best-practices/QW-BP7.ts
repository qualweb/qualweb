'use strict';

import { BestPractice as BestPracticeType, BestPracticeResult } from '@qualweb/best-practices';
import BestPractice from './BestPractice.object';
import { DomElement, DomUtils } from 'htmlparser2';
import { DomUtils as QWDomUtils } from '@qualweb/util';

const bestPractice: BestPracticeType = {
  name: 'Title element contains ASCII-art',
  code: 'QW-BP7',
  description: 'Title element contains ASCII-art',
  metadata: {
    target: {
      element: 'title'
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

class QW_BP7 extends BestPractice {

  constructor() {
    super(bestPractice);
  }

  async execute(element: DomElement | undefined): Promise<void> {

    if (!element) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const titleValue = DomUtils.getText(element);

    if (/^[\x00-\x7F]*$/.test(titleValue)) {
      evaluation.verdict = 'passed';
      evaluation.description = `The title element doesn't contain ASCII art`;
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = `The title element contains ASCII art`;
    }

    evaluation.htmlCode = QWDomUtils.transformElementIntoHtml(element);
    evaluation.pointer = QWDomUtils.getElementSelector(element);
    
    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP7;