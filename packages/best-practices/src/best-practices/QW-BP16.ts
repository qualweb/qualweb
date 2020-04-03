'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import { ElementHandle, Page } from 'puppeteer';
import { CSSStylesheet } from '@qualweb/core';
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

  async execute(element: ElementHandle | undefined, page: Page | undefined, styleSheets: CSSStylesheet[] | undefined): Promise<void> {

    if(!page)
      return;

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const a = await page.$$("a");

    if(a.length === 0){
      evaluation.verdict = 'failed';
      evaluation.description = 'Page does not have <a>';
      evaluation.resultCode = 'RC1';
    }else{
      evaluation.verdict = 'passed';
      evaluation.description = 'Page has '+a.length+' <a>';
      evaluation.resultCode = 'RC2';
    }

    super.addEvaluationResult(evaluation);
  }

}

export = QW_BP16;