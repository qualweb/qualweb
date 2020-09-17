'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import { QWElement } from "@qualweb/qw-element";
import { AccessibilityUtils } from '@qualweb/util';
import { QWPage } from '@qualweb/qw-page';

@ACTRuleDecorator
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
    let owner = AccessibilityUtils.getOwnerElement(element,page);

    if (name === "li") {
      if (role !== "listitem") {
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'The explicit semantic role is diferent from the implicit semantic role';
        evaluation.resultCode = 'RC1';
      } else {
        if(!!owner)
        console.log(owner.getElementTagName());
        if (owner && ["ol", "ul"].includes(owner.getElementTagName()) && AccessibilityUtils.getElementRole(owner, page) === "list") {
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
        if (owner && owner.getElementTagName() === "dl") {
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
    console.log( evaluation.resultCode);
    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R45;
