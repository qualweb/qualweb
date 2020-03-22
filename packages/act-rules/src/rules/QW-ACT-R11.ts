'use strict';

import { ElementHandle, Page } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils, AccessibilityUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';

@ACTRule
class QW_ACT_R11 extends Rule {

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

    const [inAT, accessibleName, role] = await Promise.all([
      AccessibilityUtils.isElementInAT(element,page),
      AccessibilityUtils.getAccessibleName(element, page),
      DomUtils.getElementAttribute(element, 'role')
    ]);

    if(!inAT) {
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
