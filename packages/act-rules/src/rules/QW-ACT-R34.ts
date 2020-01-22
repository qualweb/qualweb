'use strict';

import { ElementHandle, Page } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils, AccessibilityTreeUtils } from '@qualweb/util';
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

    let evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    // get all aria attributes from json to combine it in a css selector
    let ariaSelector = "";
    for (const ariaAttrib of Object.keys(ariaJSON) || []) {
      ariaSelector = ariaSelector.concat('[', ariaAttrib, '], ');
    }
    ariaSelector = ariaSelector.substring(0, ariaSelector.length - 2);

    // get all elements that are using aria attributes
    let elementsWithAriaAttribs = await element.$$(ariaSelector);

    if (elementsWithAriaAttribs === undefined) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = "No elements with WAI-ARIA state or property";
      evaluation.resultCode = 'RC1';
      super.addEvaluationResult(evaluation);
      evaluation = {
        verdict: '',
        description: '',
        resultCode: ''
      };
    } else {
      for (const elem of elementsWithAriaAttribs || []) {
        let isInAT = await AccessibilityTreeUtils.isElementInAT(elem, page);
        let elemAttribs = await DomUtils.getElementAttributesName(elem);
        let role = await AccessibilityTreeUtils.getElementRole(elem, page);
        let requiredAriaList;
        if (role !== null && !!rolesJSON[role])
          requiredAriaList = rolesJSON[role]['requiredAria'];

        for (const attrib of elemAttribs || []) {
          if (Object.keys(ariaJSON).includes(attrib)) {
            //if is in the accessibility tree
            let values = ariaJSON[attrib]["values"];
            let attrValue = await DomUtils.getElementAttribute(elem, attrib);
            let typeValue = ariaJSON[attrib]["typeValue"];
            let result = false;
            if (attrValue === "") {
              evaluation.verdict = 'inapplicable';
              evaluation.description = attrib + "property is empty";
              evaluation.resultCode = 'RC2';
            } else if (isInAT) {
              if (typeValue === "value") {
                result = values.includes(attrValue);
              } else if (typeValue === "string") {
                result = values === "";
              }
              else if (typeValue === "number") {
                result = !isNaN(attrValue);
              } else if (typeValue === "integer") {
                let regex = new RegExp('^[0-9]+$');
                result =regex.test(attrValue);
              } else if (typeValue === "list") {
                let list = attrValue.split(" ");
                let passed = true;
                for (let value of list || []) {
                  if (passed) {
                    result = values.includes(value);
                    passed = false
                  }
                }

              } else if (typeValue === "id") {
                let isRequired = requiredAriaList.includes(attrib);
                if (isRequired)
                  result = await page.$("#" + attrValue) !== null;
                else
                result = !attrValue.includes(" ");

              } else {//if (typeValue === "idList")
                let list = attrValue.split(" ");
                let isRequired = requiredAriaList.includes(attrib);
                if(isRequired){
                for (let id of list || []) {
                  if (!result )
                    result = await page.$("#" + id) !== null;
                }}
                else{
                  result = true;
                }
              }

              if (result) {
                evaluation.verdict = 'passed';
                evaluation.description = attrib + "property has a valid value";
                evaluation.resultCode = 'RC3';
              } else {
                evaluation.verdict = 'failed';
                evaluation.description = attrib + "property has an invalid value";
                evaluation.resultCode = 'RC4';
              }


            } else {
              //if they are not in the accessibility tree
              evaluation.verdict = 'inapplicable';
              evaluation.description = "This element is not included in the accessibility tree";
              evaluation.resultCode = 'RC5';
            }
            const [htmlCode, pointer] = await Promise.all([
              DomUtils.getElementHtmlCode(elem),
              DomUtils.getElementSelector(elem)
            ]);

            evaluation.htmlCode = htmlCode;
            evaluation.pointer = pointer;
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
  }
}

export = QW_ACT_R34;