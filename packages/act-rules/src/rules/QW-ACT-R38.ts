'use strict';

import { Page, ElementHandle } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils, DomUtils } from '@qualweb/util';
import rolesJSON from '../lib/roles.json';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';

@ACTRule
class QW_ACT_R38 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  async execute(element: ElementHandle, page: Page): Promise<void> {

    const selector = '[role="row"],[role="list"],[role="menu"],[role="menubar"],[role="listbox"],[role="grid"],[role="rowgroup"],[role="table"],[role="treegrid"],[role="tablist"]';

    const elementOfValidRole = await element.$$(selector.substr(0, selector.length - 1));
    for (const validElement of elementOfValidRole || []) {
      const evaluation: ACTRuleResult = {
        verdict: '',
        description: '',
        resultCode: ''
      };

      const [explictiRole, implicitRole, isInAT] = await Promise.all([
        DomUtils.getElementAttribute(validElement, 'role'),
        AccessibilityUtils.getImplicitRole(validElement, page),
        AccessibilityUtils.isElementInAT(validElement, page)
      ]);

      const ariaBusy = await this.isElementADescendantOfAriaBusy(validElement, page) || await DomUtils.getElementAttribute(validElement, "aria-busy");

      if (explictiRole !== null && explictiRole !== implicitRole && isInAT && explictiRole !== "combobox" && !ariaBusy) {
        const ariaOwns = await DomUtils.getElementAttribute(validElement, "aria-owns");
        let ariaOwnsElement;
        if (!!ariaOwns) {
          ariaOwnsElement = await DomUtils.getElementById(page, validElement, ariaOwns);
        }

        const children = await DomUtils.getElementChildren(validElement);

        if (!!ariaOwnsElement) {
          children.push(ariaOwnsElement);
        }

        const result = await this.checkOwnedElementsRole(rolesJSON[explictiRole]['requiredOwnedElements'], children, page);

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

      await super.addEvaluationResult(evaluation, validElement);
    }
  }

  private async checkOwnedElementsRole(ownedRoles: string[][], elements: ElementHandle[], page: Page): Promise<boolean> {
    let result = false, end = false;
    let i = 0, j = 0;
    let hasOwnedRole, currentElement, currentOwnedRole;
    while (i < elements.length && !end) {
      hasOwnedRole = false;
      currentElement = elements[i];
      if (await AccessibilityUtils.isElementInAT(currentElement, page)) {
        const role = await AccessibilityUtils.getElementRole(currentElement, page);
        while (j < ownedRoles.length && !hasOwnedRole) {
          currentOwnedRole = ownedRoles[j];
          if (currentOwnedRole.length === 1) {
            hasOwnedRole = role === currentOwnedRole[0]
          } else {
            hasOwnedRole = role === currentOwnedRole[0] && await this.checkOwnedElementsRole([[currentOwnedRole[1]]], await DomUtils.getElementChildren(currentElement), page)
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

  private async isElementADescendantOfAriaBusy(element: ElementHandle, page: Page): Promise<boolean> {
    const parent = await DomUtils.getElementParent(element);
    let result = false;

    if (parent !== null) {
      const inAt = await AccessibilityUtils.isElementInAT(parent, page);
      if (inAt) {
        result = !!(await DomUtils.getElementAttribute(parent, "aria-busy"));
      }
      if (!result) {
        return await this.isElementADescendantOfAriaBusy(parent, page);
      } else {
        return result;
      }
    } else {
      return result;
    }
  }
}

export = QW_ACT_R38;
