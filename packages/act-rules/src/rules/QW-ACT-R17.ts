'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils, DomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import { QWElement } from "@qualweb/qw-element";
import { QWPage } from "@qualweb/qw-page";

@ACTRuleDecorator
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
    let hidden = DomUtils.isElementHidden(element, page);

    if (name === 'img') {
      const alt = element.getElementAttribute("alt");

      if (!hidden && (alt === "" || role === "presentation" || role === "none")) {
        evaluation.verdict = 'passed';
        evaluation.description = `The test target is decorative.`;
        evaluation.resultCode = 'RC1';
        super.addEvaluationResult(evaluation, element);
      } else if (!elementInAT) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The test target is not included in the accessibility tree.`;
        evaluation.resultCode = 'RC2';
        super.addEvaluationResult(evaluation, element);
      }
      else {
        const accessibleName = AccessibilityUtils.getAccessibleName(element, page);
        if (accessibleName && accessibleName.trim() !== "") {
          evaluation.verdict = 'passed';
          evaluation.description = `The test target has an accessible name.`;
          evaluation.resultCode = 'RC3';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = `The test target doesn't have an accessible name.`;
          evaluation.resultCode = 'RC4';
        }
        super.addEvaluationResult(evaluation, element, true, false, true, page);
      }
    } else if (name !== "svg" && role === "img") {
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
      super.addEvaluationResult(evaluation, element, true, false, true, page);

    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target is not an HTML element with role img.`;
      evaluation.resultCode = 'RC8';
      super.addEvaluationResult(evaluation, element);

    }
  }
}

export = QW_ACT_R17;
