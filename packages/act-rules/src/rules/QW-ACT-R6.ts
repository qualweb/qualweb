'use strict';

import { ElementHandle, Page } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';

import { DomUtils, AccessibilityTreeUtils } from '@qualweb/util';

class QW_ACT_R6 extends Rule {

  constructor() {
    super({
      name: 'Image button has accessible name',
      code: 'QW-ACT-R6',
      mapping: '59796f',
      description: 'This rule checks that each image button element has an accessible name.',
      metadata: {
        target: {
          element: 'input',
          attributes: ['type="image"']
        },
        'success-criteria': [
          {
            name: '1.1.1',
            level: 'A',
            principle: 'Perceivable',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content'
          },
          {
            name: '4.1.2',
            level: 'A',
            principle: 'Robust',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value'
          }
        ],
        related: [],
        url: 'https://act-rules.github.io/rules/59796f',
        passed: 0,
        inapplicable: 0,
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

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const isHidden = await DomUtils.isElementHidden(element);
    if (isHidden) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `This image button is not included in the accessibiliy tree`;
      evaluation.resultCode = 'RC1';
    } else {
      const accessName = await AccessibilityTreeUtils.getAccessibleName(element, page);
      if (!accessName || accessName.trim() === '') {
        evaluation.verdict = 'failed';
        evaluation.description = `It's not possible to define the accessible name of this element`;
        evaluation.resultCode = 'RC2';
      } else {
        evaluation.verdict = 'passed';
        evaluation.description = `This image button has an accessible name`;
        evaluation.resultCode = 'RC3';
      }
    }

    evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
    evaluation.pointer = await DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_ACT_R6;
