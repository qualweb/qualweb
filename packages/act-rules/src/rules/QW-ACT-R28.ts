'use strict';

import { ElementHandle, Page } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils, AccessibilityTreeUtils } from '@qualweb/util';
import rolesJSON from './roles.json';

class QW_ACT_R28 extends Rule {

  constructor() {
    super({
      name: 'Element with role attribute has required states and properties',
      code: 'QW-ACT-R28',
      mapping: '4e8ab6',
      description: 'This rule checks that elements that have an explicit role also specify all required states and properties.',
      metadata: {
        target: {
          element: '*',
          attributes: 'role'
        },
        'success-criteria': [
          {
            name: '4.1.2',
            level: 'A',
            principle: 'Robust ',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value'
          }
        ],
        related: [],
        url: 'https://act-rules.github.io/rules/4e8ab6',
        passed: 0,
        warning: 0,
        inapplicable: 0,
        failed: 0,
        type: ['ACTRule', 'TestCase'],
        a11yReq: ['WCAG21:language'],
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

    // get all elements
    let allElements = await element.$$('[role]');

    if (allElements === undefined) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = "No elements with explicit semantic role";
      evaluation.resultCode = 'RC2';
      super.addEvaluationResult(evaluation);
    } else {
      for (const elem of allElements || []) {
        let elemRole = await DomUtils.getElementAttribute(elem, 'role');
        let elemAttribs = await DomUtils.getElementAttributesName(elem);
        let implicitRole = await AccessibilityTreeUtils.getImplicitRole(elem, page);
        let isInAT = await AccessibilityTreeUtils.isElementInAT(elem, page);

        if (!isInAT) {
          evaluation.verdict = 'inapplicable';
          evaluation.description = "Element is not in Acessiblity Tree";
          evaluation.resultCode = 'RC1';
        } else if (implicitRole === elemRole) {
          evaluation.verdict = 'inapplicable';
          evaluation.description = "Explicit role equals implicit role";
          evaluation.resultCode = 'RC2';
        } else if (elemRole !== null && Object.keys(rolesJSON).includes(elemRole)) {
          if (rolesJSON[elemRole]['requiredAria']) {
            let implicitRoles: string[] = [];
            let implicitValueRoles = rolesJSON[elemRole]['implicitValueRoles'];
            for (const role of implicitValueRoles || []) {
              if (role[0] !== '') {
                implicitRoles.push(role[0]);
              }
            }
            let i = 0;
            let requiredAriaList = rolesJSON[elemRole]['requiredAria'];
            let result = true;// passed until it fails a requirement
            let requiredAria;

            while (i < requiredAriaList.length && result) {
              requiredAria = requiredAriaList[i];
              if (elemAttribs.includes(requiredAria) && !implicitRoles.includes(requiredAria)) {
                let attrValue = (await DomUtils.getElementAttribute(elem, requiredAria)).trim();
                result = attrValue !== '';
              } else {
                result = implicitRoles.includes(requiredAria);
              }
              i++;
            }
            if (result) {
              evaluation.verdict = 'passed';
              evaluation.description = "Required attibutes are listed";
              evaluation.resultCode = 'RC3';
            } else {
              evaluation.verdict = 'failed';
              evaluation.description = "Element does not list required " + requiredAria;
              evaluation.resultCode = 'RC4';
            }
          } else {
          evaluation.verdict = 'passed';
          evaluation.description = "This role does not have required state or property";
          evaluation.resultCode = 'RC5';
          }
        } else {
          evaluation.verdict = 'inapplicable';
          evaluation.description = "This role is not valid";
          evaluation.resultCode = 'RC6';
        }

        evaluation.htmlCode = await DomUtils.getElementHtmlCode(elem);
        evaluation.pointer = await DomUtils.getElementSelector(elem);
        super.addEvaluationResult(evaluation);
        evaluation = {
          verdict: '',
          description: '',
          resultCode: ''
        };
      }
    }
  }
}

export = QW_ACT_R28;
