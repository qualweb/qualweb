'use strict';

import {ElementHandle, Page} from 'puppeteer';
import Rule from './Rule.object';
import {ACTRule, ACTRuleResult} from '@qualweb/act-rules';
import {keys} from 'lodash';
import {DomUtils, AccessibilityTreeUtils} from '@qualweb/util';
import ariaJSON from './ariaAttributesRoles.json';
import rolesJSON from './roles.json';

const rule: ACTRule = {
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
    inapplicable: 0,
    failed: 0,
    type: ['ACTRule', 'TestCase'],
    a11yReq: ['WCAG21:language'],
    outcome: '',
    description: ''
  },
  results: new Array<ACTRuleResult>()
};

class QW_ACT_R25 extends Rule {

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
      // get all aria attributes from json to combine it in a css selector
      let ariaSelector = "";
      for (const ariaAttrib of keys(ariaJSON)) {
        ariaSelector = ariaSelector.concat('[', ariaAttrib, '], ');
      }
      ariaSelector = ariaSelector.substring(0, ariaSelector.length - 2);

      // get all elements that are using aria attributes
      let elementsWithAriaAttribs = await element.$$(ariaSelector);

      if (elementsWithAriaAttribs === undefined) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = "No elements withWAI-ARIA state or property";
        evaluation.resultCode = 'RC2';
        console.log(evaluation.resultCode);
        super.addEvaluationResult(evaluation);
        evaluation = {
          verdict: '',
          description: '',
          resultCode: ''
        };
      } else {
        for (const elem of elementsWithAriaAttribs) {

          let elemRole: string | undefined = undefined;
          let options = {root: elem};
          const snapshot = await page.accessibility.snapshot(options);

          let accessName = await AccessibilityTreeUtils.getAccessibleName(elem, page);
          console.log(accessName);
          let elemAttribs = await DomUtils.getElementAttributesName(elem);
          if (snapshot) {
            elemRole = snapshot['role'];
          }

          for (const attrib of elemAttribs) {
            if (keys(ariaJSON).includes(attrib)) {
              //if is in the accessibility tree
              //todo - is not working properly
              if (accessName !== '' && accessName !== undefined) {
                // if valid aria attribute
                if (ariaJSON[attrib]['global'] === 'yes' || (elemRole !== undefined && (rolesJSON[elemRole]['requiredAria'].includes(attrib) || rolesJSON[elemRole]['supportedAria'].includes(attrib)))) {
                  evaluation.verdict = 'passed';
                  evaluation.description = attrib + "property is supported or inherited by this element's role";
                  evaluation.resultCode = 'RC3';
                } else {
                  evaluation.verdict = 'failed';
                  evaluation.description = attrib + "property is neither inherited nor supported by this role";
                  evaluation.resultCode = 'RC4';
                }
              } else {
                //if they are not in the accessibility tree
                evaluation.verdict = 'inapplicable';
                evaluation.description = "This element is not included in the accessibility tree";
                evaluation.resultCode = 'RC6';
              }
              console.log(evaluation.resultCode);
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
          /* let ariaAttribRoles = ariaJSON[attrib];
           // if it can't be used by every role
           if (ariaAttribRoles !== '*') {
             for (const role of ariaAttribRoles) {
               if (roleAttrib === role) {
                 // passed
                 evaluation.verdict = 'passed';
                 evaluation.description = attrib + "property is supported by this role";
                 evaluation.resultCode = 'RC3';
                 console.log(evaluation.resultCode);
                 evaluation.htmlCode = await DomUtils.getElementHtmlCode(elem);
                 evaluation.pointer = await DomUtils.getElementSelector(elem);
                 super.addEvaluationResult(evaluation);
                 evaluation = {
                   verdict: '',
                   description: '',
                   resultCode: ''
                 };
               } else {
                 console.log(role);
                 console.log(rolesJSON[role]);
                 console.log(rolesJSON[role]['htmlElements']);
                 for (const htmlElem of rolesJSON[role]['htmlElements']) {
                   if (htmlElem === elem['name']) {
                     // passed
                     evaluation.verdict = 'passed';
                     evaluation.description = attrib + "property is supported by this type of element";
                     evaluation.resultCode = 'RC4';
                     console.log(evaluation.resultCode);
                   }
                 }
                 if (evaluation.verdict !== 'passed') {
                   // failed
                   evaluation.verdict = 'failed';
                   evaluation.description = attrib + "property is neither inherited nor supported by this role";
                   evaluation.resultCode = 'RC5';
                   console.log(evaluation.resultCode);
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
           } else {
             // passed
             evaluation.verdict = 'passed';
             evaluation.description = attrib + "property is supported by all base markup elements";
             evaluation.resultCode = 'RC6';
             console.log(evaluation.resultCode);
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
       }*/
        }
      }
    }
  }
}

export = QW_ACT_R25;
