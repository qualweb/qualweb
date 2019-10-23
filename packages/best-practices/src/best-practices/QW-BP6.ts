'use strict';

import { BestPractice as BestPracticeType, BestPracticeResult } from '@qualweb/best-practices';
import BestPractice from './BestPractice.object';
import { DomElement, DomUtils } from 'htmlparser2';
import { DomUtils as QWDomUtils } from '@qualweb/util';

const bestPractice: BestPracticeType = {
  name: 'title element is not too long (64 characters)',
  code: 'QW-BP6',
  mapping: '',
  description: 'The webpage title element shouldn\'t have more than 64 characters',
  metadata: {
    target: {
      element: 'title'
    },
    'success-criteria': [],
    related: [],
    url: '',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array<BestPracticeResult>()
};

class QW_BP6 extends BestPractice {

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

    //todo eh suposto mesmo ser trimmed? os espaços nao contam?
    const titleValue = DomUtils.getText(element);

    if (titleValue.trim().length > 64) {
      evaluation.verdict = 'failed';
      evaluation.description = `The page title has more than 64 characters`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'passed';
      evaluation.description = 'The page title has less than 64 characters';
      evaluation.resultCode = 'RC2';
    }

    evaluation.htmlCode = QWDomUtils.transformElementIntoHtml(element);
    evaluation.pointer = QWDomUtils.getElementSelector(element);
    
    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP6;
