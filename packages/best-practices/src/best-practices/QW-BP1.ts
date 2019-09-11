'use strict';

import {BestPractice as BestPracticeType, BestPracticeResult} from '@qualweb/best-practices';
import BestPractice from './BestPractice.object';
import {DomElement} from 'htmlparser2';
import {getElementSelector, transform_element_into_html} from "../util";

const stew = new (require('stew-select')).Stew();

const bestPractice: BestPracticeType = {
  name: 'Using h1-h6 to identify headings',
  code: 'QW-BP1',
  mapping: 'H42',
  description: 'It is recommended to use HTML and XHTML heading markup to provide semantic code for headings in the content',
  metadata: {
    target: {
      element: 'h1, h2, h3, h4, h5, h6'
    },
    'success-criteria': [{
      name: '1.3.1',
      level: 'A',
      principle: 'Perceivable',
      url: 'https://www.w3.org/TR/2016/NOTE-UNDERSTANDING-WCAG20-20161007/content-structure-separation-programmatic.html'
    }],
    related: ['H69', 'G141', 'F2', 'F43'],
    url: 'https://www.w3.org/TR/WCAG20-TECHS/H42.html',
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

  async execute(element: DomElement | undefined, dom: DomElement[]): Promise<void> {

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: ''
    };

    if (element === undefined) {
      evaluation.verdict = 'failed';
      evaluation.description = 'This page doesn\'t use headings';
      bestPractice.metadata.failed++;
    } else {
      evaluation.verdict = 'warning';
      evaluation.description = 'Check that heading markup is used when content is a heading';
      bestPractice.metadata.warning++;

      evaluation.code = transform_element_into_html(element);
      evaluation.pointer = getElementSelector(element);
    }

    bestPractice.results.push(_.clone(evaluation));
  }
}

export = QW_BP1;
