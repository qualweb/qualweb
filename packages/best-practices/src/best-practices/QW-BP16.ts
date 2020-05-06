'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import { ElementHandle } from 'puppeteer';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPractice, ElementExists } from '../lib/decorator';

@BestPractice
class QW_BP16 extends BestPracticeObject {

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  @ElementExists
  async execute(element: ElementHandle): Promise<void> {

    let evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const aElements = await element.$$('a');

    if(aElements.length === 0){
      evaluation.verdict = 'failed';
      evaluation.description = 'Page does not have any <a> elements.';
      evaluation.resultCode = 'RC1';
      await super.addEvaluationResult(evaluation);
    } else {
      for (const a of aElements || []) {
        evaluation = {
          verdict: '',
          description: '',
          resultCode: ''
        };

        evaluation.verdict = 'passed';
        evaluation.description = 'Page has the element <a>.';
        evaluation.resultCode = 'RC2';

        await super.addEvaluationResult(evaluation, a);
      }
    }
  }
}

export = QW_BP16;