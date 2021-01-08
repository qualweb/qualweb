'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPractice, ElementExists, ElementDoesNotHaveChild } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';

@BestPractice
class QW_BP9 extends BestPracticeObject {
  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  @ElementExists
  @ElementDoesNotHaveChild('th')
  async execute(element: QWElement | undefined): Promise<void> {
    if (!element) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const headers = element.getElements('th');

    if (headers.length === 0) {
      const caption = element.getElements('caption');

      if (caption.length !== 0) {
        evaluation.verdict = 'passed';
        evaluation.description = `Table doesn't have header cells but has a caption`;
        evaluation.resultCode = 'RC1';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = `Table doesn't have header cells or caption`;
        evaluation.resultCode = 'RC2';
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `Table has header cells`;
      evaluation.resultCode = 'RC3';
    }

    evaluation.htmlCode = element.getElementHtmlCode(true, true);
    evaluation.pointer = element.getElementSelector();

    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP9;
