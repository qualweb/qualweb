'use strict';

import { ElementHandle, Page } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists, ElementIsInAccessibilityTree } from '../lib/decorator';

@ACTRule
class QW_ACT_R6 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  @ElementIsInAccessibilityTree
  async execute(element: ElementHandle, page: Page): Promise<void> {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const accessibleName = await AccessibilityUtils.getAccessibleName(element, page);
    if (accessibleName && accessibleName.trim()) {
      evaluation.verdict = 'passed';
      evaluation.description = `The \`image button\` has an accessible name.`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = `The \`image button\` doesn't have an accessible name.`;
      evaluation.resultCode = 'RC2';
    }

    evaluation.accessibleName = accessibleName;

    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R6;
