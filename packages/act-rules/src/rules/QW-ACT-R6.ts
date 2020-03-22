'use strict';

import { ElementHandle, Page } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';

@ACTRule
class QW_ACT_R6 extends Rule {

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

    const isInAT = await AccessibilityUtils.isElementInAT(element, page);
    if (!isInAT) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The \`image button\` is not included in the accessibiliy tree.`;
      evaluation.resultCode = 'RC1';
    } else {
      const accessibleName = await AccessibilityUtils.getAccessibleName(element, page);
      if (accessibleName && accessibleName.trim()) {
        evaluation.verdict = 'passed';
        evaluation.description = `The \`image button\` has an accessible name.`;
        evaluation.resultCode = 'RC2';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = `The \`image button\` doesn't have an accessible name.`;
        evaluation.resultCode = 'RC3';
      }
    }

    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R6;
