'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPractice, ElementExists, ElementIsNotChildOf } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';

@BestPractice
class QW_BP4 extends BestPracticeObject {

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  @ElementExists
  @ElementIsNotChildOf('nav')
  execute(element: QWElement | undefined): void {

    if (!element || element.elementHasParent('nav')) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const aCount = element.getNumberOfSiblingsWithTheSameTag();
    if (aCount >= 10) {
      evaluation.verdict = 'failed';
      evaluation.description = `It was found a group of 10 or more links not grouped within a nav element`;
      evaluation.resultCode = 'RC1';
    } else {
      return;
    }

    const parent = element.getElementParent();
    if (parent) {
      evaluation.htmlCode = parent.getElementHtmlCode(true, true);
      evaluation.pointer = parent.getElementSelector();
    }

    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP4;
