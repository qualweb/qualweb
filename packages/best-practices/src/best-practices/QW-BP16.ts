'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import { ElementHandle } from 'puppeteer';
import { DomUtils } from '@qualweb/util';
import BestPractice from './BestPractice.object';

class QW_BP16 extends BestPractice {

  constructor() {
    super({
      name: 'Verify if page has links (<a>)',
      code: 'QW-BP16',
      description: 'At least one link <a> in the page',
      metadata: {
        target: {
          element: 'body'
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

    if(!element) {
      return;
    }

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

        evaluation.htmlCode = await DomUtils.getElementHtmlCode(a, true, true);
        evaluation.pointer = await DomUtils.getElementSelector(a);

        super.addEvaluationResult(evaluation);
      }
    }
  }

}

export = QW_BP16;