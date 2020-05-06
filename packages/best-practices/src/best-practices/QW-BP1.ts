'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { ElementHandle } from 'puppeteer';
import { BestPractice } from '../lib/decorator';

@BestPractice
class QW_BP1 extends BestPracticeObject {

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  async execute(element: ElementHandle | undefined): Promise<void> {

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (!element) {
      evaluation.verdict = 'failed';
      evaluation.description = `This page doesn't use headings`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'warning';
      evaluation.description = 'Check that heading markup is used when content is a heading';
      evaluation.resultCode = 'RC2';
    }
    
    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_BP1;
