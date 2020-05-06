'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { ElementHandle } from 'puppeteer';
import { BestPractice, ElementExists, ElementDoesNotHaveChild } from '../lib/decorator';

@BestPractice
class QW_BP9 extends BestPracticeObject {

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  @ElementExists
  @ElementDoesNotHaveChild('th')
  async execute(element: ElementHandle): Promise<void> {

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const caption = await element.$$('caption');

    if (caption.length !== 0) {
      evaluation.verdict = 'passed';
      evaluation.description = `Table doesn't have header cells but has a caption`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = `Table doesn't have header cells or caption`;
      evaluation.resultCode = 'RC2';
    }
    
    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_BP9;
