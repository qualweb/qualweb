'use strict';

import {
  BestPractice as BestPracticeType,
  BestPracticeResult
} from '@qualweb/best-practices';
import BestPractice from './BestPractice.object';
import {
  DomElement,
  DomUtils
} from 'htmlparser2';
import {
  DomUtils as QWDomUtils
} from '@qualweb/util';

const bestPractice: BestPracticeType = {
  name: 'Link element with text content equal to the content of the title attribute',
  code: 'QW-BP3',
  description: 'The link element text content shouldn\'t be equal to the content of the title attribute',
  metadata: {
    target: {
      element: 'a',
      attributes: 'title'
    },
    related: ['H33'],
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array < BestPracticeResult > ()
};

class QW_BP3 extends BestPractice {

  constructor() {
    super(bestPractice);
  }

  async execute(element: DomElement | undefined): Promise < void > {
    
    if (!element) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const titleValue = QWDomUtils.getElementAttribute(element, 'title');

    if (titleValue.trim().toLowerCase() === DomUtils.getText(element).trim().toLowerCase()) {
      evaluation.verdict = 'failed';
      evaluation.description = `Link text content and title attribute value are the same`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'passed';
      evaluation.description = 'Link text content and title attribute value are not the same';
      evaluation.resultCode = 'RC2';
    }
    console.log(evaluation);
    evaluation.htmlCode = QWDomUtils.transformElementIntoHtml(element);
    evaluation.pointer = QWDomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP3;
