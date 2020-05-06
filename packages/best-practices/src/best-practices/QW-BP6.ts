'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { ElementHandle } from 'puppeteer';
import { DomUtils } from '@qualweb/util';
import { BestPractice, ElementExists } from '../lib/decorator';

@BestPractice
class QW_BP6 extends BestPracticeObject {

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  @ElementExists
  async execute(element: ElementHandle): Promise<void> {

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const titleValue = await DomUtils.getElementText(element);

    if (titleValue.length > 64) {
      evaluation.verdict = 'failed';
      evaluation.description = `The page title has more than 64 characters`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'passed';
      evaluation.description = 'The page title has less than 64 characters';
      evaluation.resultCode = 'RC2';
    }
    
    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_BP6;
