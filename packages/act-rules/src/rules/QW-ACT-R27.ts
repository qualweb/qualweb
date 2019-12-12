'use strict';

import {ElementHandle} from 'puppeteer';
import Rule from './Rule.object';
import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';
import {keys} from 'lodash';
import { DomUtils } from '@qualweb/util';
import ariaJSON from './ariaAttributesRoles.json';

const rule: ACTRule = {
  name: 'aria-* attribute is defined in WAI-ARIA',
  code: 'QW-ACT-R27',
  mapping: '5f99a7',
  description: 'This rule checks that each aria- attribute specified is defined in ARIA 1.1.',
  metadata: {
    target: {
      element: '*',
      attributes: 'aria-*'
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
    url: 'https://act-rules.github.io/rules/5f99a7',
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

class QW_ACT_R27 extends Rule {

  constructor() {
    super(rule);
  }

  async execute(element: ElementHandle | undefined): Promise<void> {


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
      let allElements = await element.$$('*');
      let countAria = 0;
      let failedAria = "";

      if (allElements === undefined) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = "No elements within the body element";
        evaluation.resultCode = 'RC2';
        super.addEvaluationResult(evaluation);
      } else {
        for (const elem of allElements) {
          countAria = 0;
          failedAria = "";
          let elemAttribs = await DomUtils.getElementAttributesName(elem);
          for (const attrib of elemAttribs) {
            if(attrib.startsWith("aria-")) {
              countAria++;
              if (!keys(ariaJSON).includes(attrib)) {
                failedAria = failedAria.concat(", ", attrib);
              }
            }
          }
          if(failedAria.length){
            evaluation.verdict = 'failed';
            evaluation.description = "The following aria-* attributes are not defined in ARIA 1.1: " + failedAria;
            evaluation.resultCode = 'RC3';
          } else if (countAria){
            evaluation.verdict = 'passed';
            evaluation.description = "All aria-* attributes in this element are defined in ARIA 1.1";
            evaluation.resultCode = 'RC4';
          } else {
            evaluation.verdict = 'inapplicable';
            evaluation.description = "This elements does not have aria-* attributes";
            evaluation.resultCode = 'RC5';
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

export = QW_ACT_R27;
