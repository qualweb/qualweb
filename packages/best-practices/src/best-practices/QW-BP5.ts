'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPractice } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';

@BestPractice
class QW_BP5 extends BestPracticeObject {
  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  execute(element: QWElement | undefined): void {
    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    //const parent = await DomUtils.getElementParent(element);

    if (!element) {
      evaluation.verdict = 'passed';
      evaluation.description = 'There are not table elements inside other table elements';
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = 'There are table elements inside other table elements';
      evaluation.resultCode = 'RC2';
      evaluation.htmlCode = element.getElementHtmlCode(true, true);
      evaluation.pointer = element.getElementSelector();
    }
    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP5;
