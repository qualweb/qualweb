'use strict';

import { Page, ElementHandle } from 'puppeteer';
import Rule from './Rule.object';

import { ACTRuleResult } from '@qualweb/act-rules';
import rolesJSON from './roles.json';

import {
  AccessibilityTreeUtils,
  DomUtils
} from '@qualweb/util';

class QW_ACT_R33 extends Rule {

  constructor() {
    super({
      name: 'ARIA required context role',
      code: 'QW-ACT-R33',
      mapping: 'ff89c9',
      description: 'This rule checks that an element with an explicit semantic role exists inside its required context.',
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
        url: 'https://act-rules.github.io/rules/ff89c9',
        passed: 0,
        warning: 0,
        failed: 0,
        inapplicable: 0,
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

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const [explictiRole, implicitRole, isInAT, isValidRole] = await Promise.all([
      DomUtils.getElementAttribute(element, "role"),
      AccessibilityTreeUtils.getImplicitRole(element, page),
      AccessibilityTreeUtils.isElementInAT(element, page),
      AccessibilityTreeUtils.elementHasValidRole(element, page)
    ]);

    if (explictiRole !== null && isValidRole && explictiRole !== implicitRole && isInAT && rolesJSON[explictiRole]["requiredContextRole"] !== "") {
      const requiredContextRole = rolesJSON[explictiRole]["requiredContextRole"];
      const id = await DomUtils.getElementAttribute(element, "id");
      const ariaOwns = await page.$('[aria-owns' + `="${id}"]`);

      if (ariaOwns !== null) {
        const ariaOwnsRole = await AccessibilityTreeUtils.getElementRole(ariaOwns, page);
        if (requiredContextRole.includes(ariaOwnsRole)) {
          evaluation.verdict = 'passed';
          evaluation.description = `Parent has required context role.`;
          evaluation.resultCode = 'RC1';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = `Parent doesnt have required context role`;
          evaluation.resultCode = 'RC2';
        }
      } else if (await this.isElementADescendantOf(element, page, requiredContextRole)) {
        evaluation.verdict = 'passed';
        evaluation.description = `Parent has required context role.`;
        evaluation.resultCode = 'RC1';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = `Parent doesnt have required context role`;
        evaluation.resultCode = 'RC2';
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `Element is not in Acessiblity Tree or doesnt have an explicit role with required context role`;
      evaluation.resultCode = 'RC3';
    }
    const [htmlCode, pointer] = await Promise.all([
      DomUtils.getElementHtmlCode(element),
      DomUtils.getElementSelector(element)
    ]);
    evaluation.htmlCode = htmlCode;
    evaluation.pointer = pointer;

    super.addEvaluationResult(evaluation);
  }

  private async isElementADescendantOf(element: ElementHandle, page: Page, roles: string[]): Promise<boolean> {
    if (!element) {
      throw Error('Element is not defined');
    }
    const parent = await DomUtils.getElementParent(element);
    let result = false;
    let sameRole;

    if (parent !== null) {
      const parentRole = await AccessibilityTreeUtils.getElementRole(parent, page);
      if (parentRole !== null) {
        sameRole = roles.includes(parentRole);
      }
      result = sameRole;
      if (parentRole === null || parentRole === "presentation" || parentRole === "none") {
        return await this.isElementADescendantOf(parent, page, roles);
      } else {
        return result;
      }
    } else {
      return result;
    }
  }
}

export = QW_ACT_R33;