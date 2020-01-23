'use strict';

import { Page, ElementHandle } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils, DomUtils } from '@qualweb/util';

class QW_ACT_R19 extends Rule {

  constructor() {
    super({
      name: 'iframe element has accessible name',
      code: 'QW-ACT-R19',
      mapping: 'cae760',
      description: 'This rule checks that each iframe element has an accessible name.',
      metadata: {
        target: {
          element: 'iframe'
        },
        'success-criteria': [{
            name: '4.1.2',
            level: 'A',
            principle: 'Robust',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html'
          },
          {
            name: '2.4.1',
            level: 'A',
            principle: 'Operable',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html'
          }],
        related: [],
        url: 'https://act-rules.github.io/rules/cae760',
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

    const hidden = await DomUtils.isElementHiddenByCSS(element);
    if(hidden){
      evaluation.verdict = 'inapplicable';
      evaluation.description = `iframe is not included in the accessibility tree.`;
      evaluation.resultCode = 'RC1';
    }else{
      const accessibleName = await AccessibilityUtils.getAccessibleName(element, page);
      if(accessibleName && accessibleName.trim() !== ''){
        evaluation.verdict = 'passed';
        evaluation.description = `The iframe element has accessible name`;
        evaluation.resultCode = 'RC6';
      }else{
        evaluation.verdict = 'failed';
        evaluation.description = `The iframe element hasn't accessible name`;
        evaluation.resultCode = 'RC7';
      }
    }

    evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
    evaluation.pointer = await DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}
export = QW_ACT_R19;