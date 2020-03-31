'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPractice from './BestPractice.object';
import { ElementHandle } from 'puppeteer';
import { DomUtils } from '@qualweb/util';

class QW_BP10 extends BestPractice {

  constructor() {
    super({
      name: 'HTML elements are used to control visual presentation of content',
      code: 'QW-BP10',
      description: 'No HTML elements are used to control the visual presentation of content',
      metadata: {
        target: {
          element: ['b', 'blink', 'blockquote', 'basefont', 'center', 'cite', 'em', 'font', 'i', 'link', 'mark', 'strong', 's', 'strike', 'u', 'vlink']
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
      evaluation.htmlCode = await DomUtils.getElementHtmlCode(element, true, true);
      evaluation.pointer = await DomUtils.getElementSelector(element);
    }
    
    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP10;
