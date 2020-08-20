'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import {AccessibilityUtils} from '@qualweb/util';
import rolesJSON from '../lib/roles.json';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import {QWElement} from "@qualweb/qw-element";
import {QWPage} from "@qualweb/qw-page";

@ACTRuleDecorator
class QW_ACT_R33 extends Rule {

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

    const explicitRole = element.getElementAttribute('role');
    const implicitRole = AccessibilityUtils.getImplicitRole(element, page,"");
    const isInAT = AccessibilityUtils.isElementInAT(element, page);
    const isValidRole = AccessibilityUtils.elementHasValidRole(element, page);

    if (explicitRole !== null && isValidRole && explicitRole !== implicitRole && isInAT && rolesJSON[explicitRole]['requiredContextRole'] !== '') {
      const requiredContextRole = rolesJSON[explicitRole]['requiredContextRole'];
      const id = element.getElementAttribute('id');

      const ariaOwns = page.getElement('[aria-owns' + `="${id}"]`,element);

      if (ariaOwns !== null) {
        const ariaOwnsRole = AccessibilityUtils.getElementRole(ariaOwns, page);
        if (requiredContextRole.includes(ariaOwnsRole)) {
          evaluation.verdict = 'passed';
          evaluation.description = `The test target parent has the required context \`role\`.`;
          evaluation.resultCode = 'RC1';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = `The test target parent doesn't have the required context \`role\``;
          evaluation.resultCode = 'RC2';
        }
      } else if (this.isElementADescendantOf(element, page, requiredContextRole)) {
        evaluation.verdict = 'passed';
        evaluation.description = `The test target parent has the required context \`role\`.`;
        evaluation.resultCode = 'RC3';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = `The test target parent doesn't have the required context \`role\``;
        evaluation.resultCode = 'RC4';
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target is not in the accessibility tree or doesn't have an explicit \`role\` with the required context \`role\``;
      evaluation.resultCode = 'RC5';
    }

    super.addEvaluationResult(evaluation, element);
  }

  private isElementADescendantOf(element: QWElement, page: QWPage, roles: string[]): boolean {
    let parent = element.getElementParent();
    if(!parent){
      let documentSelector= element.getElementAttribute("_documentSelector")
      if(!!documentSelector && !documentSelector.includes("iframe")){
        parent = page.getElement(documentSelector);
      }
    }
    let result = false;
    let sameRole;

    if (parent !== null) {
      const parentRole = AccessibilityUtils.getElementRole(parent, page);
      if (parentRole !== null) {
        sameRole = roles.includes(parentRole);
      }
      result = sameRole;
      if (parentRole === null || parentRole === 'presentation' || parentRole === 'none') {
        return this.isElementADescendantOf(parent, page, roles);
      } else {
        return result;
      }
    } else {
      return result;
    }
  }
}

export = QW_ACT_R33;
