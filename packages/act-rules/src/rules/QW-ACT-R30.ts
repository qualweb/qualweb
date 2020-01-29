'use strict';

'use strict';

import { Page, ElementHandle } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils, DomUtils } from '@qualweb/util';

class QW_ACT_R30 extends Rule {

  constructor() {
    super({
      name: 'Visible label is part of accessible name',
      code: 'QW-ACT-R30',
      mapping: '2ee8b8',
      description: 'This rule checks that interactive elements labeled through their content have their visible label as part of their accessible name.',
      metadata: {
        target: {
          element: '*'
        },
        'success-criteria': [
          {
            name: '2.5.3',
            level: 'A',
            principle: 'Operable',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html'
          }
        ],
        related: [],
        url: 'https://act-rules.github.io/rules/2ee8b8',
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

    const tagName  = await DomUtils.getElementTagName(element);
    let isWidget;

    if(tagName === 'a'){
      isWidget = await DomUtils.elementHasAttribute(element, 'href');
    }else{
      isWidget = await AccessibilityUtils.isElementWidget(element);
    }

    if(!isWidget) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target is not a \`widget\`.`;
      evaluation.resultCode = 'RC1';
    } else {
      const supportsNameFromContent = await AccessibilityUtils.allowsNameFromContent(element);
      if(!supportsNameFromContent){
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The test target is not a \`widget\` that supports name from content.`;
        evaluation.resultCode = 'RC2';
      } else {
        const [accessibleName, elementText] = await Promise.all([
          AccessibilityUtils.getAccessibleName(element, page),
          AccessibilityUtils.getTrimmedText(element)
        ]);

        if(accessibleName === undefined) {
          evaluation.verdict = 'failed';
          evaluation.description = `The test target doesn't have an accessible name.`;
          evaluation.resultCode = 'RC6';
        } else if(elementText && elementText.length === 1) {
          evaluation.verdict = 'inapplicable';
          evaluation.description = `The test target contains non-text content.`;
          evaluation.resultCode = 'RC3';
        } else if(elementText && accessibleName.toLowerCase().trim().includes(elementText.toLowerCase())) {
          evaluation.verdict = 'passed';
          evaluation.description = `The complete visible text content of the test target either matches or is contained within its accessible name.`;
          evaluation.resultCode = 'RC4';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = `The complete visible text content of the test target neither matches or is contained within its accessible name.`;
          evaluation.resultCode = 'RC5';
        }
      }
    }

    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R30;
