'use strict';


import { Page, ElementHandle } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';

@ACTRule
class QW_ACT_R30 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  async execute(element: ElementHandle, page: Page): Promise<void> {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const isWidget = await AccessibilityUtils.isElementWidget(element);
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
