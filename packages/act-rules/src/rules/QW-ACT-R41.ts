'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists, ElementHasOneOfTheFollowingRoles } from '../lib/decorator';
import { QWElement } from "@qualweb/qw-element";

@ACTRuleDecorator
class QW_ACT_R41 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  @ElementHasOneOfTheFollowingRoles(["checkbox", "combobox", "listbox", "menuitemcheckbox", "menuitemradio", "radio", "searchbox", "slider", "spinbutton", "switch", "textbox"])
  execute(element: QWElement): void {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    evaluation.verdict = 'warning';
    evaluation.description = ' Check that text error messages provided, identify the cause of the error or how to fix the error.';
    evaluation.resultCode = 'RC1';

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R41;
