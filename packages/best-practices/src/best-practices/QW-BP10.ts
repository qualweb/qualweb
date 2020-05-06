'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { ElementHandle } from 'puppeteer';
import { DomUtils } from '@qualweb/util';
import { BestPractice } from '../lib/decorator';

@BestPractice
class QW_BP10 extends BestPracticeObject {

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  async execute(element: ElementHandle | undefined): Promise<void> {

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (element === undefined) {
      evaluation.verdict = 'passed';
      evaluation.description = `The webpage doesn't use elements to control the visual content presentation`;
      evaluation.resultCode = 'RC1';
    } else {
      const name = await DomUtils.getElementTagName(element);

      evaluation.verdict = 'failed';
      evaluation.description = `The webpage uses the element ${name} to control the visual content presentation`;
      evaluation.resultCode = 'RC2';

      evaluation.attributes = name;
    }
    
    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_BP10;
