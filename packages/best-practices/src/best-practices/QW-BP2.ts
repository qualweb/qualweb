'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPractice, ElementExists, ElementHasAttribute, ElementHasNonEmptyAttribute } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';

@BestPractice
class QW_BP2 extends BestPracticeObject {

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  @ElementExists
  @ElementHasAttribute('alt')
  @ElementHasNonEmptyAttribute('alt')
  async execute(element: QWElement | undefined): Promise<void> {

    if (!element) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };
    const altValue = element.getElementAttribute( 'alt');   

    if (!altValue || altValue === '') {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'The img alt text attribute is empty';
      evaluation.resultCode = 'RC1';
    } else if (altValue.trim().length > 100) {
      evaluation.verdict = 'failed';
      evaluation.description = 'The img alt text attribute has more than 100 characters';
      evaluation.resultCode = 'RC2';
    } else {
      evaluation.verdict = 'passed';
      evaluation.description = 'The img alt text attribute has less than 100 characters';
      evaluation.resultCode = 'RC3';
    }
    
    evaluation.htmlCode = element.getElementHtmlCode( true, true);
    evaluation.pointer = element.getElementSelector();
    
    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP2;
