'use strict';

import { Page, ElementHandle } from 'puppeteer';
import Rule from './Rule.object';

import { ACTRuleResult } from '@qualweb/act-rules';
import rolesJSON from './roles.json';

import { AccessibilityUtils, DomUtils,ShadowDomUtils } from '@qualweb/util';

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
      DomUtils.getElementAttribute(element, 'role'),
      AccessibilityUtils.getImplicitRole(element, page),
      AccessibilityUtils.isElementInAT(element, page),
      AccessibilityUtils.elementHasValidRole(element, page)
    ]);

    if (explictiRole !== null && isValidRole && explictiRole !== implicitRole && isInAT && rolesJSON[explictiRole]['requiredContextRole'] !== '') {
      const requiredContextRole = rolesJSON[explictiRole]['requiredContextRole'];
      const id = await DomUtils.getElementAttribute(element, 'id');
      const treeSelector = await ShadowDomUtils.getTreeSelector(element);

      const ariaOwns = await page.$('[aria-owns' + `="${id}"]`+ treeSelector);

      if (ariaOwns !== null) {
        const ariaOwnsRole = await AccessibilityUtils.getElementRole(ariaOwns, page);
        if (requiredContextRole.includes(ariaOwnsRole)) {
          evaluation.verdict = 'passed';
          evaluation.description = `The test target parent has the required context \`role\`.`;
          evaluation.resultCode = 'RC1';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = `The test target parent doesn't have the required context \`role\``;
          evaluation.resultCode = 'RC2';
        }
      } else if (await this.isElementADescendantOf(element, page, requiredContextRole)) {
        evaluation.verdict = 'passed';
        evaluation.description = `The test target parent has the required context \`role\`.`;
        evaluation.resultCode = 'RC1';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = `The test target parent doesn't have the required context \`role\``;
        evaluation.resultCode = 'RC2';
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target is not in the acessiblity tree or doesn't have an explicit \`role\` with the required context \`role\``;
      evaluation.resultCode = 'RC3';
    }

    await super.addEvaluationResult(evaluation, element);
  }

  private async isElementADescendantOf(element: ElementHandle, page: Page, roles: string[]): Promise<boolean> {
    const parent = await DomUtils.getElementParent(element);
    let result = false;
    let sameRole;

    if (parent !== null) {
      const parentRole = await AccessibilityUtils.getElementRole(parent, page);
      if (parentRole !== null) {
        sameRole = roles.includes(parentRole);
      }
      result = sameRole;
      if (parentRole === null || parentRole === 'presentation' || parentRole === 'none') {
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
