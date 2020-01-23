'use strict';

import { ElementHandle, Page } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils, AccessibilityUtils } from '@qualweb/util';

import ariaJSON from './ariaAttributesRoles.json';
import rolesJSON from './roles.json';

class QW_ACT_R25 extends Rule {

  constructor() {
    super({
      name: 'ARIA state or property is permitted',
      code: 'QW-ACT-R25',
      mapping: '5c01ea',
      description: 'This rule checks that WAI-ARIA states or properties are allowed for the element they are specified on.',
      metadata: {
        target: {
          element: '*',
          attributes: 'aria-*'
        },
        'success-criteria': [
          {
            name: '4.1.1',
            level: 'A',
            principle: 'Robust',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/parsing.html'
          },
          {
            name: '4.1.2',
            level: 'AA',
            principle: 'Robust',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value'
          },
        ],
        related: [],
        url: 'https://act-rules.github.io/rules/5c01ea',
        passed: 0,
        warning: 0,
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

    // get all aria attributes from json to combine it in a css selector
    let ariaSelector = '';
    for (const ariaAttrib of Object.keys(ariaJSON) || []) {
      ariaSelector = ariaSelector.concat('[', ariaAttrib, '], ');
    }
    ariaSelector = ariaSelector.substring(0, ariaSelector.length - 2);

    // get all elements that are using aria attributes
    const elementsWithAriaAttribs = await element.$$(ariaSelector);

    for (const elem of elementsWithAriaAttribs || []) {
      const elemRole = await AccessibilityUtils.getElementRole(elem,page);
      const isInAT = await AccessibilityUtils.isElementInAT(elem, page);
      const elemAttribs = await DomUtils.getElementAttributesName(elem);
    
      for (const attrib of elemAttribs || []) {
        if (Object.keys(ariaJSON).includes(attrib)) {
          const evaluation: ACTRuleResult = {
            verdict: '',
            description: '',
            resultCode: ''
          };

          //if is in the accessibility tree
          if (isInAT) {
            // if valid aria attribute
            if (ariaJSON[attrib]['global'] === 'yes' || (elemRole !== undefined && (rolesJSON[elemRole]['requiredAria'].includes(attrib) || rolesJSON[elemRole]['supportedAria'].includes(attrib)))) {
              evaluation.verdict = 'passed';
              evaluation.description = attrib + "property is supported or inherited by this element's role";
              evaluation.resultCode = 'RC2';
            } else {
              evaluation.verdict = 'failed';
              evaluation.description = attrib + "property is neither inherited nor supported by this role";
              evaluation.resultCode = 'RC3';
            }
          } else {
            //if they are not in the accessibility tree
            evaluation.verdict = 'inapplicable';
            evaluation.description = "This element is not included in the accessibility tree";
            evaluation.resultCode = 'RC4';
          }

          super.addEvaluationResult(evaluation, elem);
        }
      }
    }
  }
}

export = QW_ACT_R25;
