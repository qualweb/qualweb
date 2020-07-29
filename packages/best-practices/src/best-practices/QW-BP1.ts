'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPractice, ElementExists } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';
import { AccessibilityUtils, DomUtils } from '@qualweb/util';
import { QWPage } from '@qualweb/qw-page';

@BestPractice
class QW_BP1 extends BestPracticeObject {

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {

    const headings = element.getElements('h1, h2, h3, h4, h5, h6, [role="heading"]');

    for (const heading of headings || []) {
      const evaluation: BestPracticeResult = {
        verdict: '',
        description: '',
        resultCode: ''
      };

      if (AccessibilityUtils.isElementInAT(heading, page) || DomUtils.isElementVisible(heading, page)) {
        evaluation.verdict = 'warning';
        evaluation.description = 'Check that heading markup is used when content is a heading.';
        evaluation.resultCode = 'RC1';

        super.addEvaluationResult(evaluation, heading);
      }
    }

    if (super.getNumberOfWarningResults() === 0) {
      const evaluation: BestPracticeResult = {
        verdict: '',
        description: '',
        resultCode: ''
      };
      evaluation.verdict = 'failed';
      evaluation.description = `This page doesn't use headings.`;
      evaluation.resultCode = 'RC2';
      super.addEvaluationResult(evaluation);
    }
  }
}

export = QW_BP1;
