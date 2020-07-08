'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import {  DomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';
import {QWElement} from "@qualweb/qw-element";
import {QWPage} from "@qualweb/qw-page";

@ACTRule
class QW_ACT_R42 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };
    
    const isInAT = !(DomUtils.isElementHidden(element) || DomUtils.isElementPresentation(element,page));
    if (isInAT) {
        evaluation.verdict = 'passed';
        evaluation.description = 'The test target is in the Acessibility Tree';
        evaluation.resultCode = 'RC1';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = `The test target is not in the Acessibility Tree.`;
        evaluation.resultCode = 'RC2';
      }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R42;
