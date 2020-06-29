'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists} from '../lib/decorator';
import { QWElement } from "@qualweb/qw-element";
import { QWPage } from '@qualweb/qw-page';
import { AccessibilityUtils } from '@qualweb/util';

@ACTRule
class QW_ACT_R46 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement,page:QWPage): void {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };
    let name = element.getElementTagName();
    let role = AccessibilityUtils.getElementRole(element,page);

    if(name ===) 

    evaluation.verdict = 'warning';
    evaluation.description = ' Check that text error messages provided, identify the cause of the error or how to fix the error.';
    evaluation.resultCode = 'RC1';

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R46;
