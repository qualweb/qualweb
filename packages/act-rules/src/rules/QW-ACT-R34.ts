'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils } from '@qualweb/util';
import ariaJSON from '../lib/ariaAttributesRoles.json';
import rolesJSON from '../lib/roles.json';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import { QWElement } from "@qualweb/qw-element";
import { QWPage } from "@qualweb/qw-page";

@ACTRuleDecorator
class QW_ACT_R34 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {

    // get all aria attributes from json to combine it in a css selector
    let ariaSelector = '';
    for (const ariaAttrib of Object.keys(ariaJSON) || []) {
      ariaSelector = ariaSelector.concat('[', ariaAttrib, '], ');
    }
    ariaSelector = ariaSelector.substring(0, ariaSelector.length - 2);

    // get all elements that are using aria attributes
    const elementsWithAriaAttribs = element.getElements(ariaSelector);

    for (const elem of elementsWithAriaAttribs || []) {
      const isInAT = AccessibilityUtils.isElementInAT(elem, page);
      let elemAttribs = elem.getElementAttributesName();
      elemAttribs = elemAttribs.filter((elem) => elem.startsWith("ar"));

      for (const attrib of elemAttribs || []) {
        const evaluation: ACTRuleResult = {
          verdict: '',
          description: '',
          resultCode: ''
        };
        if (attrib in ariaJSON) {
          //if is in the accessibility tree
          const values = ariaJSON[attrib]['values'];
          const attrValue = elem.getElementAttribute(attrib);
          const typeValue = ariaJSON[attrib]['typeValue'];

          let result = false;
          if (attrValue === '') {
            evaluation.verdict = 'inapplicable';
            evaluation.description = 'The test target `' + attrib + '` attribute is empty.';
            evaluation.resultCode = 'RC2';
          } else if (attrValue && isInAT) {
            if (typeValue === 'value') {
              result = values.includes(attrValue);
            } else if (typeValue === 'string') {
              result = values === '';
            } else if (typeValue === 'number') {
              result = !isNaN(Number(attrValue));
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

            } else {
              const role = AccessibilityUtils.getElementRole(elem, page);

              let requiredAriaList;
              if (role !== null && !!rolesJSON[role]) {
                requiredAriaList = rolesJSON[role]['requiredAria'];
              }
              if (typeValue === 'id') {
                const isRequired = requiredAriaList && requiredAriaList.includes(attrib);
                if (isRequired)
                  result = page.getElement('#' + attrValue) !== null;
                else
                  result = !attrValue.includes(' ');

              } else {//if (typeValue === 'idList')
                const list = attrValue.split(' ');
                const isRequired = requiredAriaList && requiredAriaList.includes(attrib);
                if (isRequired) {
                  for (const id of list || []) {
                    if (!result) {
                      result = page.getElement('#' + id) !== null;
                    }
                  }
                } else {
                  result = true;
                }
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

          super.addEvaluationResult(evaluation, element);
        }
      }
    }
  }
}

export = QW_ACT_R34;
