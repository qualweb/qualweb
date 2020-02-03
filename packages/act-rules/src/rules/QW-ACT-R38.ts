'use strict';

import { Page, ElementHandle } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';
import rolesJSON from './roles.json';
import { AccessibilityUtils, DomUtils } from '@qualweb/util';

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



    let aplicableRoles = ["row", "group", "list", "menu", "menubar", "listbox", "grid", "rowgroup", "table", "treegrid", "tablist"]

    let selector = "";

    for (let aplicableRole of aplicableRoles) {
      selector = selector + '[role"' + aplicableRole + ']'
    }
    console.log(selector);

    let elementOfValidRole = await element.$$(selector);


    for (let validElement of elementOfValidRole) {

      const [explictiRole, implicitRole, isInAT, isValidRole] = await Promise.all([
        DomUtils.getElementAttribute(validElement, 'role'),
        AccessibilityUtils.getImplicitRole(validElement, page),
        AccessibilityUtils.isElementInAT(validElement, page),
        AccessibilityUtils.elementHasValidRole(validElement, page)
      ]);
      let ariaBusy = await this.isElementADescendantOfAriaBusy(validElement, page);

      if (explictiRole !== null && isValidRole && explictiRole !== implicitRole && isInAT && rolesJSON[explictiRole]['requiredContextRole'] !== '' && explictiRole !== "combobox" && !ariaBusy) {
        let children = await DomUtils.getElementChildren(validElement);
        let result = true;
        let child, childRole;
        let i = 0;

        while (result && i < children.length) {
          child = children[i];
          childRole = await AccessibilityUtils.getElementRole(child, page);
          result = !!childRole && rolesJSON[childRole] && rolesJSON[childRole]['requiredContextRole'].contains(explictiRole);

        }

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
        evaluation.description = `The test target is not in the acessiblity tree or doesn't have an explicit \`role\`  diferent from the implicit role or has the role 'combobox' or has an Acessiblity Tree ancestor with 'aria-busy' `;
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
