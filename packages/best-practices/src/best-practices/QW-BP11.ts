'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import { ElementHandle } from 'puppeteer';
import { DomUtils } from '@qualweb/util';

import BestPractice from './BestPractice.object';

class QW_BP11 extends BestPractice {

  constructor() {
    super({
      name: 'Using br to make a list',
      code: 'QW-BP11',
      description: 'Using 3 consecutive br elements',
      metadata: {
        target: {
          element: 'br'
        },
        passed: 0,
        warning: 0,
        failed: 0,
        inapplicable: 0,
        outcome: '',
        description: ''
      },
      results: new Array<BestPracticeResult>()
    });
  }

  async execute(element: ElementHandle | undefined): Promise<void> {

    if (!element) {
      return;
    }

    const children = await element.evaluate(elem => {
      return elem.children.length;
    });

    if (children === 0) {
      return;
    }

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
      evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
      evaluation.pointer = await DomUtils.getElementSelector(element);

      super.addEvaluationResult(evaluation);
    }
  }
}

export = QW_BP11;
