'use strict';

'use strict';

import { Page, ElementHandle } from 'puppeteer';
import Rule from './Rule.object';

import { ACTRuleResult } from '@qualweb/act-rules';
import rolesJSON from './roles.json';

import {
  AccessibilityTreeUtils,
  DomUtils
} from '@qualweb/util';

class QW_ACT_R33 extends Rule {

  constructor() {
    super({
      name: 'ARIA required context role',
      code: 'QW-ACT-R33',
      mapping: 'ff89c9',
      description: 'This rule checks that an element with an explicit semantic role exists inside its required context.',
      metadata: {
        target: {
          element: '*'
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
        inapplicable: 0,
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

    let explictiRole  = await DomUtils.elementHasAttribute(element, "role");
    let implicitRole = "role";//todo
    let isInAT = true;//todo
    let isValidRole= true;//todo

    if(isValidRole && explictiRole !== implicitRole && isInAT && rolesJSON[explictiRole]["requiredContextRole"]!== ""){
      let requiredContextRole = rolesJSON[explictiRole]["requiredContextRole"];
      let parent = await DomUtils.getElementParent(element);
      let parentRole = "role"; //todo Completo

      if(requiredContextRole.includes(parentRole)){
        evaluation.verdict = 'passed';
        evaluation.description = `Parent has required context role.`;
        evaluation.resultCode = 'RC1';
      }else{
        evaluation.verdict = 'failed';
        evaluation.description = `Parent doesnt have required context role`;
        evaluation.resultCode = 'RC2';
      }

      

    }else{
      evaluation.verdict = 'inapplicable';
      evaluation.description = `Element is not in Acessiblity Tree or doesnt have an explicit role with required context role`;
      evaluation.resultCode = 'RC3';
    }
    evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
    evaluation.pointer = await DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_ACT_R33;