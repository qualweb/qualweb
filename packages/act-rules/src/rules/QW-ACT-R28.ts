'use strict';

import {ElementHandle, Page} from 'puppeteer';
import Rule from './Rule.object';
import {ACTRule, ACTRuleResult} from '@qualweb/act-rules';
import {keys, trim} from 'lodash';
import {DomUtils} from '@qualweb/util';
import rolesJSON from './roles.json';

const rule: ACTRule = {
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
};

class QW_ACT_R28 extends Rule {

  constructor() {
    super(rule);
  }

  async execute(element: ElementHandle | undefined, page: Page): Promise<void> {


    let evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (element === undefined) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = "This website does not have a body element";
      evaluation.resultCode = 'RC1';
      console.log(evaluation.resultCode);
      super.addEvaluationResult(evaluation);
    } else {
      // get all elements
      let allElements = await element.$$('[role]');

      if (allElements === undefined) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = "No elements with explicit semantic role";
        evaluation.resultCode = 'RC2';
        console.log(evaluation.resultCode);
        super.addEvaluationResult(evaluation);
      } else {
        for (const elem of allElements) {

          //todo ver se esta na accessibility tree
          //todo se sim, continua para o todo debaixo
          //todo se nao, eh inapplicable

          let elemRole = await DomUtils.getElementAttribute(elem, 'role');
          let elemAttribs = await DomUtils.getElementAttributesName(elem);

          //todo verificar se elemento tem um role implicito igual ao atribute role explicito
          //todo se sim, eh inapplicable
          //todo se nao, continua para o if abaixo

          if (elemRole !== undefined && keys(rolesJSON).includes(elemRole)) {
            if (rolesJSON[elemRole]['requiredAria']) {
              for (const requiredRole of rolesJSON[elemRole]['requiredAria']) {
                if (elemAttribs.includes(requiredRole)) {
                  let attrValue = trim(await DomUtils.getElementAttribute(elem, requiredRole));
                  if (attrValue === '') {

                    let implicitRoles: string[] = [];
                    let implicitValueRoles = rolesJSON[elemRole]['implicitValueRoles'][0];
                    for (const role of implicitValueRoles) {
                      if (role[0] !== '') {
                        implicitRoles.push(role[0]);
                      }
                    }

                    if (implicitRoles.includes(requiredRole)) {
                      evaluation.verdict = 'passed';
                      evaluation.description = requiredRole + "attibute has an implicit value";
                      evaluation.resultCode = 'RC3';
                    } else {
                      evaluation.verdict = 'failed';
                      evaluation.description = "Required " + requiredRole + " do not have a value that is not empty";
                      evaluation.resultCode = 'RC4';
                    }
                  } else {
                    evaluation.verdict = 'passed';
                    evaluation.description = "Required" + requiredRole + "attibute is listed";
                    evaluation.resultCode = 'RC5';
                  }
                } else {
                  evaluation.verdict = 'failed';
                  evaluation.description = "Element does not list required " + requiredRole;
                  evaluation.resultCode = 'RC6';
                }
              }
            } else {
              evaluation.verdict = 'passed';
              evaluation.description = "This role does not have required state or property";
              evaluation.resultCode = 'RC7';
            }
          } else {
            evaluation.verdict = 'inapplicable';
            evaluation.description = "This role is not valid";
            evaluation.resultCode = 'RC8';
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
}

export = QW_ACT_R28;
