'use strict';

import { ElementHandle, Page } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils, DomUtils } from '@qualweb/util';

class QW_ACT_R21 extends Rule {

  constructor() {
    super({
      name: 'svg element with explicit role has accessible name',
      code: 'QW-ACT-R21',
      mapping: '7d6734',
      description: 'This rule checks that each SVG image element that is explicitly included in the accessibility tree has an accessible name.',
      metadata: {
        target: {
          element: '*'
        },
        'success-criteria': [
          {
            name: '1.1.1',
            level: 'A',
            principle: 'Perceivable',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html'
          }
        ],
        related: [],
        url: 'https://act-rules.github.io/rules/7d6734',
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

    const roleList = ['img', 'graphics-document', 'graphics-symbol'];

    const elementsToEvaluate = await element.$$('svg *');
    elementsToEvaluate.push(element);

    for (const elem of elementsToEvaluate || []) {
      const evaluation: ACTRuleResult = {
        verdict: '',
        description: '',
        resultCode: ''
      };

      const [role, isHidden, accessibleName] = await Promise.all([
        DomUtils.getElementAttribute(elem, 'role'),
        DomUtils.isElementHidden(elem),
        AccessibilityUtils.getAccessibleNameSVG(elem, page)
      ]);

      if (!role || (role && roleList.indexOf(role) < 0) || isHidden) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `No test target with this specific roles is included in the accessibility tree.`;
        evaluation.resultCode = 'RC1';
      } else if (accessibleName && accessibleName.trim()) {
        evaluation.verdict = 'passed';
        evaluation.description = `The test target has an accessible name.`;
        evaluation.resultCode = 'RC2';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = `The test target doesn't have an accessible name.`;
        evaluation.resultCode = 'RC3';
      }
      
      await super.addEvaluationResult(evaluation, elem);
    }
  }
}

export = QW_ACT_R21;
