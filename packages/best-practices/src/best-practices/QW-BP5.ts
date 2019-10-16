'use strict';

import { BestPractice as BestPracticeType, BestPracticeResult } from '@qualweb/best-practices';
import BestPractice from './BestPractice.object';
import { DomElement } from 'htmlparser2';
import { DomUtils } from '@qualweb/util';

const bestPractice: BestPracticeType = {
  name: 'Using table elements inside other table elements',
  code: 'QW-BP5',
  description: 'It is not recommended to use table elements inside other table elements',
  metadata: {
    target: {
      element: 'table',
      parent: 'table'
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

class QW_BP1 extends BestPractice {

  constructor() {
    super(bestPractice);
  }

  async execute(element: DomElement | undefined): Promise<void> {

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (!element) {
      evaluation.verdict = 'passed';
      evaluation.description = 'There are not table elements inside other table elements';
      evaluation.htmlCode = 'RC1';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = 'It was found table elements inside other table elements';
      evaluation.htmlCode = 'RC2';
      evaluation.htmlCode = DomUtils.transformElementIntoHtml(element);
      evaluation.pointer = DomUtils.getElementSelector(element);
    }
    
    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP1;