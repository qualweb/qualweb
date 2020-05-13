'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPractice, ElementExists } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';

@BestPractice
class QW_BP16 extends BestPracticeObject {

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  @ElementExists
   execute(element: QWElement): void {

    let evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const aElements = element.getElements('a');

    if(aElements.length === 0){
      evaluation.verdict = 'failed';
      evaluation.description = 'Page does not have any <a> elements.';
      evaluation.resultCode = 'RC1';
      super.addEvaluationResult(evaluation);
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

        super.addEvaluationResult(evaluation, a);
      }
    }
  }
}

export = QW_BP16;