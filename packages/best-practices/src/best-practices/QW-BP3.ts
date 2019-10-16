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
  code: 'QW-BP2',
  mapping: 'H33',
  description: 'The link element text content shouldn\'t be equal to the content of the title attribute',
  metadata: {
    target: {
      element: 'a',
      attributes: 'title'
    },
    'success-criteria': [{
        name: '2.4.4',
        level: 'A',
        principle: 'Operable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context'
      },
      {
        name: '2.4.9',
        level: 'AAA',
        principle: 'Operable',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-link-only'
      }
    ],
    related: ['C7', 'H30'],
    url: 'https://www.w3.org/WAI/WCAG21/Techniques/html/H33',
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array < BestPracticeResult > ()
};

class QW_BP1 extends BestPractice {

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

    if (titleValue.trim() === DomUtils.getText(element).trim()) {
      evaluation.verdict = 'failed';
      evaluation.description = `Link text content and title attribute value are the same`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'passed';
      evaluation.description = 'Link text content and title attribute value are not the same';
      evaluation.resultCode = 'RC2';
    }

    evaluation.htmlCode = QWDomUtils.transformElementIntoHtml(element);
    evaluation.pointer = QWDomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP1;