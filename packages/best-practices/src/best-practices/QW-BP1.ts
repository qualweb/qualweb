'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPractice } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';

@BestPractice
class QW_BP1 extends BestPracticeObject {

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  execute(element: QWElement | undefined): void {

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (!element) {
      evaluation.verdict = 'failed';
      evaluation.description = `This page doesn't use headings`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'warning';
      evaluation.description = 'Check that heading markup is used when content is a heading';
      evaluation.resultCode = 'RC2';
      evaluation.htmlCode = element.getElementHtmlCode( true, true);
      evaluation.pointer = element.getElementSelector();
    }
    
    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP1;
