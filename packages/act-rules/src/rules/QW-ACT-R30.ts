'use strict';

'use strict';

import { Page, ElementHandle } from 'puppeteer';
import Rule from './Rule.object';

import { ACTRuleResult } from '@qualweb/act-rules';

import {
  AccessibilityTreeUtils,
  DomUtils
} from '@qualweb/util';

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
        'success-criteria': [],
        related: [],
        url: 'https://act-rules.github.io/rules/2ee8b8',
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

    let tagName  = await DomUtils.getElementTagName(element);
    let isWidget;

    if(tagName === 'a'){
      isWidget = await DomUtils.elementHasAttribute(element, "href")
    }else{
      isWidget = await AccessibilityTreeUtils.isElementWidget(element);
    }

    if(!isWidget){
      evaluation.verdict = 'inapplicable';
      evaluation.description = `not a widget`;
      evaluation.resultCode = 'RC1';
    }else{
      let supportsNameFromContent = await AccessibilityTreeUtils.allowsNameFromContent(element);
      if(!supportsNameFromContent){
        evaluation.verdict = 'inapplicable';
        evaluation.description = `not a widget that supports name from content.`;
        evaluation.resultCode = 'RC2';
      }else{

        let accessibleName = await AccessibilityTreeUtils.getAccessibleName(element, page);
        let elementText    = await AccessibilityTreeUtils.getTrimmedText(element);

        if(elementText.length === 1){
          evaluation.verdict = 'inapplicable';
          evaluation.description = `non-text content.`;
          evaluation.resultCode = 'RC3';
        }else if(accessibleName.toLowerCase().trim().includes(elementText.toLowerCase())){
          evaluation.verdict = 'passed';
          evaluation.description = `the complete visible text content of the target element either matches or is contained within its accessible name.`;
          evaluation.resultCode = 'RC4';
        }else{
          evaluation.verdict = 'failed';
          evaluation.description = `the complete visible text content of the target element neither matches or is contained within its accessible name.`;
          evaluation.resultCode = 'RC5';
        }
      }
    }
    evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
    evaluation.pointer = await DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }
}

export = QW_ACT_R30;