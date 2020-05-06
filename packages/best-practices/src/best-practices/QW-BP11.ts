'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import { ElementHandle } from 'puppeteer';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPractice, ElementExists, ElementHasChild } from '../lib/decorator';

@BestPractice
class QW_BP11 extends BestPracticeObject {

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  @ElementExists
  @ElementHasChild('*')
  async execute(element: ElementHandle): Promise<void> {

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const { result, hasBr } = await element.evaluate(elem => {
      let result = 0;
      let hasBr = false;

      for (const child of elem.children || []) {
        const type = child.nodeType;
        if (child && child.tagName.toLowerCase() === 'br') {
          result++;
          hasBr = true;
        } else if(type !== 3) {
          result = 0;
        }
      }

      return { result, hasBr };
    });

    if (result > 3) {
      evaluation.verdict = 'failed';
      evaluation.description = 'Br elements are being be used as a list';
      evaluation.resultCode = 'RC1';
    } else if (hasBr) {
      evaluation.verdict = 'passed';
      evaluation.description = 'There are less than 3 consecutive br.';
      evaluation.resultCode = 'RC2';
    }

    if (hasBr) {
      await super.addEvaluationResult(evaluation, element);
    }
  }
}

export = QW_BP11;
