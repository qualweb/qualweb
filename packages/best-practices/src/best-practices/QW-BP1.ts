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
  execute(element: QWElement | undefined, page: QWPage): void {
    if (!element) { return }


    let headings = element.getElements('h1, h2, h3, h4, h5, h6,[role="heading"]');
    let hasWarning = false;

    for (let heading of headings) {
      const evaluation: BestPracticeResult = {
        verdict: '',
        description: '',
        resultCode: ''
      };

      if (!AccessibilityUtils.isElementInAT(heading, page) || DomUtils.isElementVisible(heading, page)) {
        evaluation.verdict = 'warning';
        evaluation.description = 'Check that heading markup is used when content is a heading';
        evaluation.resultCode = 'RC1';
        evaluation.htmlCode = element.getElementHtmlCode(true, true);
        evaluation.pointer = element.getElementSelector();
        hasWarning = true;
      }
      super.addEvaluationResult(evaluation);
    }
    if (!hasWarning) {
      const evaluation: BestPracticeResult = {
        verdict: '',
        description: '',
        resultCode: ''
      };
      evaluation.verdict = 'failed';
      evaluation.description = `This page doesn't use headings`;
      evaluation.resultCode = 'RC2';
      super.addEvaluationResult(evaluation);
    }


  }
}

export = QW_BP1;
