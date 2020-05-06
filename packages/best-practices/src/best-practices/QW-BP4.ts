'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { ElementHandle } from 'puppeteer';
import { DomUtils } from '@qualweb/util';
import { BestPractice, ElementExists, ElementIsNotChildOf } from '../lib/decorator';

@BestPractice
class QW_BP4 extends BestPracticeObject {

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  @ElementExists
  @ElementIsNotChildOf('nav')
  async execute(element: ElementHandle): Promise<void> {

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const aCount = await element.evaluate(elem => {
      let aCount = 1;
      let nextSibling = elem['nextElementSibling'];
      while (nextSibling) {
        if (nextSibling['tagName'].toLowerCase() === 'a') {
          aCount++;
        }
        nextSibling = nextSibling['nextElementSibling'];
      }
      return aCount;
    });

    if (aCount >= 10) {
      evaluation.verdict = 'failed';
      evaluation.description = `It was found a group of 10 or more links not grouped within a nav element`;
      evaluation.resultCode = 'RC1';
    } else  {
      return;
    }

    const parent = await DomUtils.getElementParent(element);
    await super.addEvaluationResult(evaluation, parent || undefined);
  }
}

export = QW_BP4;
