'use strict';

import { ElementHandle, Page } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils, AccessibilityUtils } from '@qualweb/util';

class QW_ACT_R11 extends Rule {

  constructor() {
    super({
      name: 'Button has accessible name',
      code: 'QW-ACT-R11',
      mapping: '97a4e1',
      description: 'This rule checks that each button element has an accessible name.',
      metadata: {
        target: {
          element:  ['button', 'input', 'summary'],
          attributes: ['role="button"']
        },
        'success-criteria': [{
          name: '4.1.2',
          level: 'A',
          principle: 'Robust',
          url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value'
        }],
        related: [],
        url: 'https://act-rules.github.io/rules/97a4e1',
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

  async execute(element: ElementHandle | undefined, page:Page): Promise<void> {
    
    if (!element) {
      return;
    }

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const [isHidden, accessibleName, role] = await Promise.all([
      DomUtils.isElementHidden(element),
      AccessibilityUtils.getAccessibleName(element, page),
      DomUtils.getElementAttribute(element, 'role')
    ]);

    if(isHidden) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'The test target is not included in the accessibility tree.';
      evaluation.resultCode = 'RC1';
    } else if (role && role !== 'button'){
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target role is overriden.`;
      evaluation.resultCode = 'RC3';
    } else if(!accessibleName || !accessibleName.trim()) {
      evaluation.verdict = 'failed';
      evaluation.description = `The test target doesn't have an accessible name, or it's empty ("").`;
      evaluation.resultCode = 'RC4';
    } else {
      evaluation.verdict = 'passed';
      evaluation.description = `The test target has a valid accessible name.`;
      evaluation.resultCode = 'RC5';
    }

    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R11;
