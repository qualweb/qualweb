'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';
import { QWElement } from "@qualweb/qw-element";
import { AccessibilityUtils } from '@qualweb/util';
import { QWPage } from '@qualweb/qw-page';

@ACTRule
class QW_ACT_R45 extends Rule {

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
    let name = element.getElementTagName();
    let role = AccessibilityUtils.getElementRole(element, page);
    let parent = element.getElementParent();

    if (name === "li") {
      if (role !== "listitem") {
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'The explicit semantic role is diferent from the implicit semantic role';
        evaluation.resultCode = 'RC1';
      } else {
        if (parent && ["ol", "ul"].includes(parent.getElementTagName()) && AccessibilityUtils.getElementRole(parent, page) === "list") {
          evaluation.verdict = 'passed';
          evaluation.description = 'The element follows the flow content model';
          evaluation.resultCode = 'RC2';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = 'The element doesnt follow the flow content model';
          evaluation.resultCode = 'RC3';
        }
      }
    } else {//if (name === "dd" || name === "dt") {
      if (name === "dd" && role !== "definition" || name === "dt" && role !== "term") {
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'The explicit semantic role is diferent from the implicit semantic role';
        evaluation.resultCode = 'RC4';
      } else {
        if (parent && parent.getElementTagName() === "dl") {
          evaluation.verdict = 'passed';
          evaluation.description = 'The element follows the flow content model';
          evaluation.resultCode = 'RC5';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = 'The element doesnt follow the flow content model';
          evaluation.resultCode = 'RC6';
        }
      }
    }
    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R45;
