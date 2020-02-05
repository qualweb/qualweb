'use strict';

import {Page, ElementHandle} from 'puppeteer';
import Rule from './Rule.object';
import {ACTRuleResult} from '@qualweb/act-rules';
import rolesJSON from './roles.json';
import {AccessibilityUtils, DomUtils} from '@qualweb/util';

class QW_ACT_R33 extends Rule {

  constructor() {
    super({
      name: 'ARIA required owned elements',
      code: 'QW-ACT-R38',
      mapping: 'bc4a75',
      description: 'This rule checks that an element with an explicit semantic role has at least one of its required owned elements.',
      metadata: {
        target: {
          element: '*',
          attributes: 'role'
        },
        'success-criteria': [{
          name: '1.3.1',
          level: 'A',
          principle: 'Perceivable ',
          url: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html'
        }],
        related: [],
        url: 'https://github.com/act-rules/act-rules.github.io/blob/develop/_rules/aria-required-owned-element-bc4a75.md',
        passed: 0,
        warning: 0,
        failed: 0,
        type: ['ACTRule', 'TestCase'],
        a11yReq: ['WCAG21:title'],
        outcome: '',
        description: ''
      },
      results: new Array<ACTRuleResult>()
    });
  }

  async execute(element: ElementHandle | undefined, page: Page): Promise<void> {

    if (!element) {
      return;
    }
    let evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };
    const selector = '[role="row"],[role="list"],[role="menu"],[role="menubar"],[role="listbox"],[role="grid"],[role="rowgroup"],[role="table"],[role="treegrid"],[role="tablist"]';

    let elementOfValidRole = await element.$$(selector.substr(0, selector.length - 1));
    for (let validElement of elementOfValidRole) {

      const [explictiRole, implicitRole, isInAT] = await Promise.all([
        DomUtils.getElementAttribute(validElement, 'role'),
        AccessibilityUtils.getImplicitRole(validElement, page),
        AccessibilityUtils.isElementInAT(validElement, page)]);

      let ariaBusy = await this.isElementADescendantOfAriaBusy(validElement, page) || await DomUtils.getElementAttribute(validElement, "aria-busy");

      if (explictiRole !== null && explictiRole !== implicitRole && isInAT && explictiRole !== "combobox" && !ariaBusy) {
        let ariaOwns = await DomUtils.getElementAttribute(validElement, "aria-owns");
        let ariaOwnsElement;
        if (!!ariaOwns)
          ariaOwnsElement = await DomUtils.getElementById(page, validElement, ariaOwns);
        let children = await DomUtils.getElementChildren(validElement);

        if (!!ariaOwnsElement)
          children.push(ariaOwnsElement);
        let result = await this.checkOwnedElementsRole(rolesJSON[explictiRole]['requiredOwnedElements'], children, page);

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
      evaluation = {
        verdict: '',
        description: '',
        resultCode: ''
      };
    }
  }


  private async checkOwnedElementsRole(ownedRoles: string[][], elements: ElementHandle[], page: Page) {
    let result = false;
    let end = false;
    let i = 0;
    let j = 0;
    let hasOwnedRole, currentElement, currentOwnedRole, role;
    while (i < elements.length && !end) {
      hasOwnedRole = false;
      currentElement = elements[i];
      if (await AccessibilityUtils.isElementInAT(currentElement, page)) {
        role = await AccessibilityUtils.getElementRole(currentElement, page);

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
      if (result)
        end = true;
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

export = QW_ACT_R33;
