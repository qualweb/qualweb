'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import { ElementHandle } from 'puppeteer';
import { DomUtils } from '@qualweb/util';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPractice, ElementExists, ElementHasChild } from '../lib/decorator';

@BestPractice
class QW_BP12 extends BestPracticeObject {

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  @ElementExists
  @ElementHasChild('tr')
  async execute(element: ElementHandle): Promise<void> {

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const rows = await element.$$('tr');
    let firstRowChildren = await DomUtils.getElementChildren(rows[0]);

    let scope: string | null;
    let scopeCole = true;

    for (let i = 1; i < firstRowChildren.length; i++) {
      if (await DomUtils.getElementTagName(firstRowChildren[i]) === 'td' || await DomUtils.getElementTagName(firstRowChildren[i]) === 'th' && scopeCole) {
        scope = await DomUtils.getElementAttribute(firstRowChildren[i], 'scope');
        scopeCole = scope === 'col'
      }
    }
    let scopeRow = true;
    let row: ElementHandle;

    for (let i = 1; i < rows.length; i++) {
      if (scopeRow) {
        row = rows[i];
        let cells = await row.$$( 'td');
        if (cells.length > 0) {
          scope = await DomUtils.getElementAttribute(cells[0], 'scope');
          scopeRow = scope === 'row';
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
    
    await super.addEvaluationResult(evaluation, element);
  }

}

export = QW_BP12;
