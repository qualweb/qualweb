'use strict';

import { BestPractice as BestPracticeType, BestPracticeResult } from '@qualweb/best-practices';
import { ElementHandle } from 'puppeteer';
import { DomUtils } from '@qualweb/util';

import BestPractice from './BestPractice.object';

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

  async execute(element: ElementHandle | undefined): Promise<void> {

    if (!element) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    let rows = await element.$$( "tr");
    let firstRowChildren: ElementHandle[] = [];
    if (rows.length > 0) {
      firstRowChildren = await DomUtils.getElementChildren(rows[0]);

      let i, scope;
      let scopeCole = true;

      for (i = 1; i < firstRowChildren.length; i++) {
        if (await DomUtils.getElementName(firstRowChildren[i]) === "td" || await DomUtils.getElementName(firstRowChildren[i]) === "th" && scopeCole) {
          scope = await DomUtils.getElementAttribute(firstRowChildren[i], "scope");
          scopeCole = scope === "col"
        }
      }
      let scopeRow = true;
      let row;

      for (i = 1; i < rows.length; i++) {
        if ( scopeRow) {
          row = rows[i];
          let cells = await row.$$( "td");
          if (cells.length > 0) {
            scope = await DomUtils.getElementAttribute(cells[0], "scope");
            scopeRow = scope === "row";
          }
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
    evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
    evaluation.pointer = await DomUtils.getElementSelector(element);
    
    super.addEvaluationResult(evaluation);
  }

}

export = QW_BP12;