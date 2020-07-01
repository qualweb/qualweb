'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPractice } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';

@BestPractice
class QW_BP10 extends BestPracticeObject {

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  async execute(element: QWElement | undefined): Promise<void> {

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
      const name = element.getElementTagName();

      evaluation.verdict = 'failed';
      evaluation.description = `The webpage uses the element ${name} to control the visual content presentation`;
      evaluation.resultCode = 'RC2';

      evaluation.attributes = name;
      evaluation.htmlCode = element.getElementHtmlCode(true, true);
      evaluation.pointer = element.getElementSelector();
    }
    
    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP10;
