'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import {QWElement} from "@qualweb/qw-element";
import {QWPage} from "@qualweb/qw-page";

@ACTRuleDecorator
class QW_ACT_R19 extends Rule {

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

    const tabIndex = element.getElementAttribute("tabindex");
    const isInAT = AccessibilityUtils.isElementInAT(element, page);
    console.log( AccessibilityUtils.getElementRole(element, page))
    if (!isInAT ||  tabIndex && parseInt(tabIndex) < 0) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target is not included in the accessibility tree.`;
      evaluation.resultCode = 'RC1';
    } else {
      const accessibleName = AccessibilityUtils.getAccessibleName(element, page);
      if (accessibleName && accessibleName.trim()) {
        evaluation.verdict = 'passed';
        evaluation.description = `The test target has an accessible name.`;
        evaluation.resultCode = 'RC2';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = `The test target doesn't have an accessible name.`;
        evaluation.resultCode = 'RC3';
      }

    }

    super.addEvaluationResult(evaluation, element,true,false,true,page);
  }
}
export = QW_ACT_R19;
