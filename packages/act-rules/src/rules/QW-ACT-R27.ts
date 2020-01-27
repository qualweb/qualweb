'use strict';

import { ElementHandle } from 'puppeteer';
import Rule from './Rule.object';
import {  ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';
import ariaJSON from './ariaAttributesRoles.json';

class QW_ACT_R27 extends Rule {

  constructor() {
    super({
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
        failed: 0,
        type: ['ACTRule', 'TestCase'],
        a11yReq: ['WCAG21:language'],
        outcome: '',
        description: ''
      },
      results: new Array<ACTRuleResult>()
    });
  }

  async execute(element: ElementHandle | undefined): Promise<void> {

    if (!element) {
      return;
    }

    const allElements = await element.$$('*');
    for (const elem of allElements || []) {
      const evaluation: ACTRuleResult = {
        verdict: '',
        description: '',
        resultCode: ''
      };

      let countAria = 0;
      let failedAria = '';
      const elemAttribs = await DomUtils.getElementAttributesName(elem);
      for (const attrib of elemAttribs || []) {
        if(attrib.startsWith('aria-')) {
          countAria++;
          if (!Object.keys(ariaJSON).includes(attrib)) {
            failedAria = failedAria.concat(', ', attrib);
          }
        }
      }
       
      if(failedAria.length) {
        evaluation.verdict = 'failed';
        evaluation.description = 'The following aria-* attributes are not defined in ARIA 1.1: ' + failedAria;
        evaluation.resultCode = 'RC1';
      } else if (countAria) {
        evaluation.verdict = 'passed';
        evaluation.description = 'All aria-* attributes in this element are defined in ARIA 1.1';
        evaluation.resultCode = 'RC2';
      } else {
        continue;
      }

      await super.addEvaluationResult(evaluation, elem);
    }
  }
}

export = QW_ACT_R27;
