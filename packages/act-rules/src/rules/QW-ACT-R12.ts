'use strict';

import { ElementHandle, Page } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils, AccessibilityUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';

@ACTRule
class QW_ACT_R12 extends Rule {

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

    const [isInAT, accessibleName, role, tagName] = await Promise.all([
      AccessibilityUtils.isElementInAT(element,page),
      AccessibilityUtils.getAccessibleName(element, page),
      DomUtils.getElementAttribute(element, 'role'),
      DomUtils.getElementTagName(element)
    ]);

    if(!isInAT){
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
