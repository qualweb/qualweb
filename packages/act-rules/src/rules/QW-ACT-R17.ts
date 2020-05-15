'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';
import { QWElement } from "@qualweb/qw-element";
import { QWPage } from "@qualweb/qw-page";

@ACTRule
class QW_ACT_R17 extends Rule {

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

    const name = element.getElementTagName();
    const elementInAT = AccessibilityUtils.isElementInAT(element, page);
    const role = AccessibilityUtils.getElementRole(element, page);
    console.log(role);
    console.log(name);

    if (name === 'img') {
      const alt = element.getElementAttribute("alt");
      console.log(alt);
      console.log(alt === "" )

      if (alt === ""|| role === "presentation" || role === "none") {
        evaluation.verdict = 'passed';
        evaluation.description = `The test target is decorative.`;
        evaluation.resultCode = 'RC1';
      } else if (!elementInAT) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The test target is not included in the accessibility tree.`;
        evaluation.resultCode = 'RC2';
      }
      else {
        const accessibleName = AccessibilityUtils.getAccessibleName(element, page);
        if (accessibleName && accessibleName.trim()!== "") {
          evaluation.verdict = 'passed';
          evaluation.description = `The test target has an accessible name.`;
          evaluation.resultCode = 'RC3';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = `The test target doesn't have an accessible name.`;
          evaluation.resultCode = 'RC4';
        }
      }
    } else if (role === "img") {
      if (!elementInAT) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The test target is not included in the accessibility tree.`;
        evaluation.resultCode = 'RC5';
      } else {
        const accessibleName = AccessibilityUtils.getAccessibleName(element, page);
        if (accessibleName) {
          evaluation.verdict = 'passed';
          evaluation.description = `The test target has an accessible name.`;
          evaluation.resultCode = 'RC6';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = `The test target doesn't have an accessible name.`;
          evaluation.resultCode = 'RC7';
        }
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target doesn't have role img.`;
      evaluation.resultCode = 'RC8';
    }
    console.log(evaluation.resultCode)
    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R17;
