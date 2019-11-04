'use strict';

import { BestPractice as BestPracticeType, BestPracticeResult } from '@qualweb/best-practices';
import { DomElement } from 'htmlparser2';
import { DomUtils } from '@qualweb/util';

import BestPractice from './BestPractice.object';
const stew = new (require('stew-select')).Stew();

const bestPractice: BestPracticeType = {
  name: 'Using scope col and row ',
  code: 'QW-BP12',
  description: 'Using using scope col in the first row  (except first) and scope row in the first element of each row (except first)',
  metadata: {
    target: {
      element: ['table', 'tr']
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

class QW_BP12 extends BestPractice {

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

    let rows = stew.select(element, "tr");
    let firstRowChildren: DomElement[] = [];
    if (rows.length > 0) {
      firstRowChildren = rows[0].children;

      let i;
      let scopeCole = true;

      for (i = 1; i < firstRowChildren.length; i++) {
        let scope = DomUtils.getElementAttribute(firstRowChildren[i], "scope");
        scopeCole = scope === "col"
      }
      let scopeRow = true;

      for (i = 1; i < rows.length; i++) {
        if (rows[i].children.length > 0) {
          let scope = DomUtils.getElementAttribute(rows[i].children[0], "scope");
          scopeRow = scope === "row";
        }
      }

      if (scopeCole && scopeRow) {
        evaluation.verdict = 'passed';
        evaluation.description = 'The scope attribute is correctly used.';
        evaluation.resultCode = 'RC1';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = 'The scope attribute is incorrectly used.';
        evaluation.resultCode = 'RC2';
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'The table has no rows.';
      evaluation.resultCode = 'RC3';

    }
    evaluation.htmlCode = DomUtils.transformElementIntoHtml(element);
    evaluation.pointer = DomUtils.getElementSelector(element);
    super.addEvaluationResult(evaluation);
  }

}

export = QW_BP12;