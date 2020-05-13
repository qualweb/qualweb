'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPractice, ElementExists } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';

@BestPractice
class QW_BP6 extends BestPracticeObject {

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  @ElementExists
  execute(element: QWElement | undefined): void {

    if (!element) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const titleValue = element.getElementText();

    if (titleValue.length > 64) {
      evaluation.verdict = 'failed';
      evaluation.description = `The page title has more than 64 characters`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'passed';
      evaluation.description = 'The page title has less than 64 characters';
      evaluation.resultCode = 'RC2';
    }

    evaluation.htmlCode = element.getElementHtmlCode( true, true);
    evaluation.pointer = element.getElementSelector();
    
    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP6;
