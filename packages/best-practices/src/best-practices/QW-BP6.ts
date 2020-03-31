'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPractice from './BestPractice.object';
import { ElementHandle } from 'puppeteer';
import { DomUtils } from '@qualweb/util';

class QW_BP6 extends BestPractice {

  constructor() {
    super({
      name: 'title element is not too long (64 characters)',
      code: 'QW-BP6',
      description: `The webpage title element shouldn't have more than 64 characters`,
      metadata: {
        target: {
          element: 'title'
        },
        related: [],
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

    evaluation.htmlCode = await DomUtils.getElementHtmlCode(element, true, true);
    evaluation.pointer = await DomUtils.getElementSelector(element);
    
    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP6;
