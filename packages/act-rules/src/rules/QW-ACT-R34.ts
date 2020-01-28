'use strict';

import { ElementHandle, Page } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils, AccessibilityUtils } from '@qualweb/util';
import ariaJSON from './ariaAttributesRoles.json';
import rolesJSON from './roles.json';

class QW_ACT_R34 extends Rule {

  constructor() {
    super({
      name: 'ARIA state or property has valid value',
      code: 'QW-ACT-R34',
      mapping: '6a7281',
      description: 'This rule checks that each ARIA state or property has a valid value.',
      metadata: {
        target: {
          element: '*',
          attributes: 'aria-*'
        },
        'success-criteria': [
          {
            name: '4.1.2',
            level: 'AA',
            principle: 'Robust',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value'
          },
        ],
        related: [],
        url: 'https://act-rules.github.io/rules/6a7281',
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
      const [isInAT, elemAttribs, role] = await Promise.all([
        AccessibilityUtils.isElementInAT(elem, page),
        DomUtils.getElementAttributesName(elem),
        AccessibilityUtils.getElementRole(elem, page)
      ]);

      let requiredAriaList;
      if (role !== null && !!rolesJSON[role]) {
        requiredAriaList = rolesJSON[role]['requiredAria'];
      }

      for (const attrib of elemAttribs || []) {
        const evaluation: ACTRuleResult = {
          verdict: '',
          description: '',
          resultCode: ''
        };
        if (Object.keys(ariaJSON).includes(attrib)) {
          //if is in the accessibility tree
          const values = ariaJSON[attrib]['values'];
          const attrValue = await DomUtils.getElementAttribute(elem, attrib);
          const typeValue = ariaJSON[attrib]['typeValue'];

          let result = false;
          if (attrValue === '') {
            evaluation.verdict = 'inapplicable';
            evaluation.description = 'The test target `' + attrib + '` attribute is empty.';
            evaluation.resultCode = 'RC2';
          } else if (isInAT) {
            if (typeValue === 'value') {
              result = values.includes(attrValue);
            } else if (typeValue === 'string') {
              result = values === '';
            } else if (typeValue === 'number') {
              result = !isNaN(attrValue);
            } else if (typeValue === 'integer') {
              const regex = new RegExp('^[0-9]+$');
              result = regex.test(attrValue);
            } else if (typeValue === 'list') {
              const list = attrValue.split(' ');
              let passed = true;
              for (const value of list || []) {
                if (passed) {
                  result = values.includes(value);
                  passed = false
                }
              }

            } else if (typeValue === 'id') {
              const isRequired = requiredAriaList.includes(attrib);
              if (isRequired)
                result = await page.$('#' + attrValue) !== null;
              else
              result = !attrValue.includes(' ');

            } else {//if (typeValue === 'idList')
              const list = attrValue.split(' ');
              const isRequired = requiredAriaList.includes(attrib);
              if(isRequired) {
                for (const id of list || []) {
                  if (!result) {
                    result = await page.$('#' + id) !== null;
                  }
                }
              } else{
                result = true;
              }
            }

            if (result) {
              evaluation.verdict = 'passed';
              evaluation.description = 'The test target `' + attrib + '` attribute has a valid value.';
              evaluation.resultCode = 'RC3';
            } else {
              evaluation.verdict = 'failed';
              evaluation.description = 'The test target `' + attrib + '` attribute has an invalid value.';
              evaluation.resultCode = 'RC4';
            }
          } else {
            //if they are not in the accessibility tree
            evaluation.verdict = 'inapplicable';
            evaluation.description = 'The test target is not included in the accessibility tree.';
            evaluation.resultCode = 'RC5';
          }

          await super.addEvaluationResult(evaluation, element);
        }
      }
    }
  }
}

export = QW_ACT_R34;
