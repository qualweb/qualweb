'use strict';

import { BestPractice as BestPracticeType, BestPracticeResult } from '@qualweb/best-practices';
import { ElementHandle } from 'puppeteer';
import { DomUtils } from '../../../util/index';

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

    const children = await element.evaluate(elem => {
      return elem.children.length;
    })

    if (children === 0) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const rows = await element.$$('tr');
    if (rows.length > 0) {
      let { scope, scopeCole } = await rows[0].evaluate(elem => {
        let scope;
        let scopeCole = true;

        for (const child of elem.children) {
          if (child.tagName.toLowerCase() === 'td' || child.tagName.toLowerCase() === 'th' && scopeCole) {
            scope = child.getAttribute('scope');
            scopeCole = scope === 'col';
          }
        }

        return { scope, scopeCole };
      });

      let scopeRow = true;

      for (const row of rows || []) {
        scopeRow = await row.evaluate((elem, scopeRow) => {
          if (elem.children.length > 0 && scopeRow) {
            const cells = elem.querySelectorAll('td');
            if (cells.length > 0) {
              scope = cells[0].getAttribute('scope');
              scopeRow = scope === "row";
            }
          }
          return scopeRow;
        }, scopeRow);
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