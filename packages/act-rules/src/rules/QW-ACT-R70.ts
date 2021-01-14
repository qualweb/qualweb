'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils, DomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists, ElementHasNegativeTabIndex } from '../lib/decorator';
import { QWElement } from "@qualweb/qw-element";
import { QWPage } from "@qualweb/qw-page";

@ACTRuleDecorator
class QW_ACT_R70 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  @ElementHasNegativeTabIndex
  execute(element: QWElement, page: QWPage): void {
    let elementList = element.getElements('*');
    let inSequentialFocusList = elementList.filter((element) => {
      return AccessibilityUtils.isPartOfSequentialFocusNavigation(element, page) && DomUtils.isElementVisible(element,page) ;
    })
    let evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (inSequentialFocusList.length === 0) {
      evaluation.verdict = 'passed';
      evaluation.description = ' The nested browsing context does not include elements that are visible and part of the sequential focus navigation.';
      evaluation.resultCode = 'RC1';
      super.addEvaluationResult(evaluation, element);
      evaluation = {
        verdict: '',
        description: '',
        resultCode: ''
      };
    } else {
      evaluation.verdict = 'failed';
      evaluation.description =  'The nested browsing context includes elements that are visible and part of the sequential focus navigation.';
      evaluation.resultCode = 'RC2';
      super.addEvaluationResult(evaluation, element, false, false);
    }


  }
}

export = QW_ACT_R70;
