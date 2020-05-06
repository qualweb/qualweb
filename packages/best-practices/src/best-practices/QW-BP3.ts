'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { ElementHandle } from 'puppeteer';
import { DomUtils } from '@qualweb/util';
import { BestPractice, ElementExists } from '../lib/decorator';

@BestPractice
class QW_BP3 extends BestPracticeObject {

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

    const titleValue = await DomUtils.getElementAttribute(element, 'title');
    const text = await DomUtils.getElementText(element);

    if (titleValue && titleValue.trim().toLowerCase() === text.trim().toLowerCase()) {
      evaluation.verdict = 'failed';
      evaluation.description = `Link text content and title attribute value are the same`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'passed';
      evaluation.description = 'Link text content and title attribute value are not the same';
      evaluation.resultCode = 'RC2';
    }

    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_BP3;
