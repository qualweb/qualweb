'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists, ElementNotHidden } from '../lib/decorator';
import { QWElement } from "@qualweb/qw-element";
import { QWPage } from '@qualweb/qw-page';
import { AccessibilityUtils, DomUtils } from '@qualweb/util';

@ACTRuleDecorator
class QW_ACT_R46 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  @ElementNotHidden
  execute(element: QWElement, page: QWPage): void {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };
    let name = element.getElementTagName();
    let role = AccessibilityUtils.getElementRole(element, page);
    let children = element.getElementChildren();

    if (name === "ul" || name === "ol") {
      if (role !== "list") {
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'The explicit semantic role is diferent from the implicit semantic role';
        evaluation.resultCode = 'RC1';
      } else {
        if (nonHiddennChildrenHasTagName(children,page, "li","listitem")) {
          evaluation.verdict = 'passed';
          evaluation.description = 'The element follows the flow content model';
          evaluation.resultCode = 'RC2';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = 'The element doesnt follow the flow content model';
          evaluation.resultCode = 'RC3';
        }
      }
    } else {//if (name === "dl") {
      if (nonHiddennChildrenHasTagName(children,page, "dd","definition" ) && nonHiddennChildrenHasTagName(children,page, "dt","term")) {
        evaluation.verdict = 'passed';
        evaluation.description = 'The element follows the flow content model';
        evaluation.resultCode = 'RC5';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = 'The element doesnt follow the flow content model';
        evaluation.resultCode = 'RC6';
      }
    }
    super.addEvaluationResult(evaluation, element);
  }
}
function nonHiddennChildrenHasTagName(children: QWElement[],page:QWPage, name: string,role:string): boolean {
  let result = false;
  let i = 0;
  let child;
  while (i < children.length && !result) {
    child = children[i];
    if (child && child.getElementTagName() === name && !DomUtils.isElementHidden(child,page)&& AccessibilityUtils.getElementRole(child,page)===role) {
      result = true;
    }
    i++;
  }
  return result;
}



export = QW_ACT_R46;

