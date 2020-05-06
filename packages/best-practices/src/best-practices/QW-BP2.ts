'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import { ElementHandle } from 'puppeteer';
import { DomUtils } from '@qualweb/util';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPractice, ElementExists, ElementHasAttribute, ElementHasNonEmptyAttribute } from '../lib/decorator';

@BestPractice
class QW_BP2 extends BestPracticeObject {

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  @ElementExists
  @ElementHasAttribute('alt')
  @ElementHasNonEmptyAttribute('alt')
  async execute(element: ElementHandle): Promise<void> {

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const altValue = <string> await DomUtils.getElementAttribute(element, 'alt');   

    if (altValue.trim().length > 100) {
      evaluation.verdict = 'failed';
      evaluation.description = 'The img alt text attribute has more than 100 characters';
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'passed';
      evaluation.description = 'The img alt text attribute has less than 100 characters';
      evaluation.resultCode = 'RC2';
    }
    
    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_BP2;
