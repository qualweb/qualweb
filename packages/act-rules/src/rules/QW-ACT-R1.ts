'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, IsHTMLDocument } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';

@ACTRuleDecorator
class QW_ACT_R1 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }
  @IsHTMLDocument
  execute(element: QWElement | undefined,page:QWPage): void {
    
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    //the first title element was already tested
    if (super.getNumberOfPassedResults() > 0 || super.getNumberOfFailedResults() > 0) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `There's already a \`title\` element that passes or fails the rule.`;
      evaluation.resultCode = 'RC4';
    } else {
      // the first title element was not tested yet
      if (!element) { //the title element does not exit
        evaluation.verdict = 'failed';
        evaluation.description = `The \`title\` element doesn't exist.`;
        evaluation.resultCode = 'RC1';
      }
      //the title element is empty
      else if (!element.getElementText()||element.getElementText().trim() === '') {
        evaluation.verdict = 'failed';
        evaluation.description = 'The \`title\` element is empty ("").';
        evaluation.resultCode = 'RC2';
      } else { //the title element exists and it's not empty
        evaluation.verdict = 'passed';
        evaluation.description = `The \`title\` element exists and it's not empty ("").`;
        evaluation.resultCode = 'RC3';
      }
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R1;
