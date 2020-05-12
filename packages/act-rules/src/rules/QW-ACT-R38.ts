'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils, } from '@qualweb/util';
import rolesJSON from '../lib/roles.json';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';

@ACTRule
class QW_ACT_R38 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {

    const selector = '[role="row"],[role="list"],[role="menu"],[role="menubar"],[role="listbox"],[role="grid"],[role="rowgroup"],[role="table"],[role="treegrid"],[role="tablist"]';

    const elementOfValidRole =  element.getElements(selector.substr(0, selector.length - 1));
    for (const validElement of elementOfValidRole || []) {
      const evaluation: ACTRuleResult = {
        verdict: '',
        description: '',
        resultCode: ''
      };

      const explictiRole = validElement.getElementAttribute('role');
      const implicitRole = AccessibilityUtils.getImplicitRole(validElement, page,"");//fixme 
      const isInAT =AccessibilityUtils.isElementInAT(validElement, page);

      const ariaBusy =  this.isElementADescendantOfAriaBusy(validElement, page) ||  validElement.getElementAttribute( "aria-busy");

      if (explictiRole !== null && explictiRole !== implicitRole && isInAT && explictiRole !== "combobox" && !ariaBusy) {
        const ariaOwns =  validElement.getElementAttribute( "aria-owns");
        let ariaOwnsElement;
        if (!!ariaOwns) {
          ariaOwnsElement = page.getElementByID( ariaOwns,validElement);
        }

        const children = validElement.getElementChildren();

        if (!!ariaOwnsElement) {
          children.push(ariaOwnsElement);
        }

        const result =  this.checkOwnedElementsRole(rolesJSON[explictiRole]['requiredOwnedElements'], children, page);

        if (result) {
          evaluation.verdict = 'passed';
          evaluation.description = `The test target only owns elements with correct role`;
          evaluation.resultCode = 'RC1';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = `The test target owns elements that doesn't have the correct role`;
          evaluation.resultCode = 'RC2';
        }
      } else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The test target is not in the accessibility tree or doesn't have an explicit \`role\` different from the implicit role or has the role 'combobox' or has an accessibility tree ancestor with 'aria-busy'`;
        evaluation.resultCode = 'RC3';
      }

       super.addEvaluationResult(evaluation, validElement);
    }
  }

  private checkOwnedElementsRole(ownedRoles: string[][], elements: QWElement[],  page: QWPage): boolean {
    let result = false, end = false;
    let i = 0, j = 0;
    let hasOwnedRole, currentElement, currentOwnedRole;
    while (i < elements.length && !end) {
      hasOwnedRole = false;
      currentElement = elements[i];
      if ( AccessibilityUtils.isElementInAT(currentElement, page)) {
        const role =  AccessibilityUtils.getElementRole(currentElement, page);
        while (j < ownedRoles.length && !hasOwnedRole) {
          currentOwnedRole = ownedRoles[j];
          if (currentOwnedRole.length === 1) {
            hasOwnedRole = role === currentOwnedRole[0]
          } else {
            hasOwnedRole = role === currentOwnedRole[0] &&  this.checkOwnedElementsRole([[currentOwnedRole[1]]],  currentElement.getElementChildren(), page)
          }
          j++;
        }
        result = hasOwnedRole;
      }
      j = 0;
      i++;
      if (result) {
        end = true;
      }
    }

    return result;
  }

  private isElementADescendantOfAriaBusy(element: QWElement, page: QWPage): boolean {
    const parent =  element.getElementParent();
    let result = false;

    if (parent !== null) {
      const inAt =  AccessibilityUtils.isElementInAT(parent, page);
      if (inAt) {
        result = !!( parent.getElementAttribute( "aria-busy"));
      }
      if (!result) {
        return  this.isElementADescendantOfAriaBusy(parent, page);
      } else {
        return result;
      }
    } else {
      return result;
    }
  }
}

export = QW_ACT_R38;
