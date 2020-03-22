'use strict';

import { ElementHandle, Page } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils, AccessibilityUtils } from '@qualweb/util';
import rolesJSON from '../lib/roles.json';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';

@ACTRule
class QW_ACT_R28 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  async execute(element: ElementHandle, page: Page): Promise<void> {

    // get all elements
    const allElements = await element.$$('[role]');
    for (const elem of allElements || []) {
      const evaluation: ACTRuleResult = {
        verdict: '',
        description: '',
        resultCode: ''
      };

      const [elemRole, elemAttribs, implicitRole, isInAT] = await Promise.all([
        DomUtils.getElementAttribute(elem, 'role'),
        DomUtils.getElementAttributesName(elem),
        AccessibilityUtils.getImplicitRole(elem, page),
        AccessibilityUtils.isElementInAT(elem, page)
      ]);

      if (!isInAT) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'The test target is not in acessiblity tree.';
        evaluation.resultCode = 'RC1';
      } else if (implicitRole === elemRole) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'The test target explicit role equals the implicit role.';
        evaluation.resultCode = 'RC2';
      } else if (elemRole !== null && Object.keys(rolesJSON).includes(elemRole)) {
        if (rolesJSON[elemRole]['requiredAria']) {
          const implicitRoles = new Array<string>();
          const implicitValueRoles = rolesJSON[elemRole]['implicitValueRoles'];
          for (const role of implicitValueRoles || []) {
            if (role[0] !== '') {
              implicitRoles.push(role[0]);
            }
          }
          let i = 0;
          const requiredAriaList = rolesJSON[elemRole]['requiredAria'];
          let result = true;// passed until it fails a requirement
          let requiredAria;

          while (i < requiredAriaList.length && result) {
            requiredAria = requiredAriaList[i];
            if (elemAttribs && elemAttribs.includes(requiredAria) && !implicitRoles.includes(requiredAria)) {
              const attrValue = await DomUtils.getElementAttribute(elem, requiredAria);
              result = (attrValue ? attrValue.trim() : '') !== '';
            } else {
              result = implicitRoles.includes(requiredAria);
            }
            i++;
          }
          if (result) {
            evaluation.verdict = 'passed';
            evaluation.description = 'The test target required attibutes are listed.';
            evaluation.resultCode = 'RC3';
          } else {
            evaluation.verdict = 'failed';
            evaluation.description = `The test target doesn't list required ${requiredAria}.`;
            evaluation.resultCode = 'RC4';
          }
        } else {
        evaluation.verdict = 'passed';
        evaluation.description = `The test target \`role\` doesn't have required state or property`;
        evaluation.resultCode = 'RC5';
        }
      } else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'The test target `role` is not valid.';
        evaluation.resultCode = 'RC6';
      }

      await super.addEvaluationResult(evaluation, elem);
    }
  }
}

export = QW_ACT_R28;
