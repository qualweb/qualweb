'use strict';

import { BestPractice as BestPracticeType, BestPracticeResult } from '@qualweb/best-practices';
import BestPractice from './BestPractice.object';
import { DomElement } from 'htmlparser2';
import { DomUtils } from '@qualweb/util';

const bestPractice: BestPracticeType = {
  name: 'Grouped links not within a nav element',
  code: 'QW-BP4',
  mapping: '',
  description: 'Set of 10 or more links not grouped within a list (nav)',
  metadata: {
    target: {
      element: 'a'
    },
    related: [],
    passed: 0,
    warning: 0,
    failed: 0,
    inapplicable: 0,
    outcome: '',
    description: ''
  },
  results: new Array<BestPracticeResult>()
};

class QW_BP4 extends BestPractice {

  constructor() {
    super(bestPractice);
  }

  async execute(element: DomElement | undefined): Promise<void> {

    if (!element || DomUtils.elementHasParent(element, 'nav')) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    let aCount = 1;

    let nextSibling = element.next;
    while (nextSibling) {
      if (nextSibling.type === 'tag' && nextSibling.name === 'a') {
        aCount++;
      }
      nextSibling = nextSibling.next;
    }

    if (aCount >= 10) {
      evaluation.verdict = 'failed';
      evaluation.description = `It was found a group of 10 or more links not grouped within a nav element`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'warning';
      evaluation.description = `Verify if the links represent a menu and if they should be inside a nav element`;
      evaluation.resultCode = 'RC2';
    }

    evaluation.htmlCode = DomUtils.transformElementIntoHtml(element.parent);
    evaluation.pointer = DomUtils.getElementSelector(element.parent);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP4;
