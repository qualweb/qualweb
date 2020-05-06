'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { ElementHandle } from 'puppeteer';
import { BestPractice } from '../lib/decorator';

@BestPractice
class QW_BP5 extends BestPracticeObject {

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
      evaluation.verdict = 'passed';
      evaluation.description = 'There are not table elements inside other table elements';
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = 'There are table elements inside other table elements';
      evaluation.resultCode = 'RC2';
    }

    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_BP5;
