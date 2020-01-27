'use strict';

import { ElementHandle, Page } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils, AccessibilityUtils } from '@qualweb/util';

class QW_ACT_R12 extends Rule {

  constructor() {
    super( {
      name: 'Link has accessible name',
      code: 'QW-ACT-R12',
      mapping: 'c487ae',
      description: 'This rule checks that each link has an accessible name.',
      metadata: {
        target: {
          element: ['a[href]', 'area[href]'],
          attributes: ['role="link"']
        },
        'success-criteria': [
          {
            name: '2.4.4',
            level: 'A',
            principle: 'Operable',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context'
          },{
            name: '2.4.9',
            level: 'AAA',
            principle: 'Operable',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-link-only'
          },{
            name: '4.1.2',
            level: 'A',
            principle: 'Robust',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value'
          }
        ],
        related: [],
        url: 'https://act-rules.github.io/rules/c487ae',
        passed: 0,
        warning: 0,
        failed: 0,
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

    const [isHidden, accessibleName, role, tagName] = await Promise.all([
      DomUtils.isElementHidden(element),
      AccessibilityTreeUtils.getAccessibleName(element, page),
      DomUtils.getElementAttribute(element, 'role'),
      DomUtils.getElementTagName(element)
    ]);

    if(isHidden){
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'The test target is not included in the accessibility tree.';
      evaluation.resultCode = 'RC1';
    } else if (tagName === 'a' && role && role !== 'link'){
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target role is overriden.`;
      evaluation.resultCode = 'RC2';
    } else if(!accessibleName || !accessibleName.trim()) {
      evaluation.verdict = 'failed';
      evaluation.description = `The test target doesn't have an accessible name, or it's empty ("").`;
      evaluation.resultCode = 'RC3';
    } else {
      evaluation.verdict = 'passed';
      evaluation.description = `The test target has a valid accessible name.`;
      evaluation.resultCode = 'RC4';
    }

    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R12;
