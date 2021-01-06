'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists, ElementHasOneOfTheFollowingRoles } from '../lib/decorator';
import { QWElement } from "@qualweb/qw-element";
import { QWPage } from "@qualweb/qw-page";

@ACTRuleDecorator
class QW_ACT_R65 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  @ElementHasOneOfTheFollowingRoles(['button', 'checkbox', 'img', 'math', 'menuitemcheckbox', 'menuitemradio', 'option', 'progressbar', 'radio', 'scrollbar', 'separator', 'slider', 'switch', 'tab'])
  execute(element: QWElement, page: QWPage): void {
    //sem ShadowDom ou iframes
    let elementList = element.getElements('*');
    let inSequentialFocusList = elementList.filter((element) => {
      return AccessibilityUtils.isPartOfSequentialFocusNavigation(element, page);
    })
    let evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (inSequentialFocusList.length === 0) {
      evaluation.verdict = 'passed';
      evaluation.description = ' The doesn\'t element have descendants in the flat tree that are part of sequential focus navigation.';
      evaluation.resultCode = 'RC1';
      super.addEvaluationResult(evaluation, element);
      evaluation = {
        verdict: '',
        description: '',
        resultCode: ''
      };
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = 'The element have descendants in the flat tree that are part of sequential focus navigation.';
      evaluation.resultCode = 'RC2';
      super.addEvaluationResult(evaluation, element, false, false);
    }


  }
}

export = QW_ACT_R65;
