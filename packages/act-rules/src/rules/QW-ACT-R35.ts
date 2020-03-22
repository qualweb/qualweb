'use strict';

import { ElementHandle, Page } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';

@ACTRule
class QW_ACT_R35 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  async execute(element: ElementHandle, page: Page): Promise<void> {

    const role = await AccessibilityUtils.getElementRole(element, page);

    if (role !== 'heading') {
      return;
    }

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };
    
    const isInAT = await AccessibilityUtils.isElementInAT(element, page);
    if (isInAT) {
      const accessibleName = await AccessibilityUtils.getAccessibleName(element, page);
      if (accessibleName) {
        evaluation.verdict = 'passed';
        evaluation.description = 'The test target has a non-empty accessible name.';
        evaluation.resultCode = 'RC1';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = `The test target accessible name doesn't exist or it's empty ("").`;
        evaluation.resultCode = 'RC2';
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'The test target is not included in the accessibility tree.';
      evaluation.resultCode = 'RC3';
    }

    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R35;
