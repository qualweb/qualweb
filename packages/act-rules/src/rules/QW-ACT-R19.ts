'use strict';

import { Page, ElementHandle } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils, DomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';

@ACTRule
class QW_ACT_R19 extends Rule {

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

    const hidden = await DomUtils.isElementHiddenByCSS(element);
    const tabIndex = await DomUtils.getElementAttribute(element, "tabindex");
    const presentation = await DomUtils.isElementPresentation(element, page);
    if (hidden || (presentation && tabIndex && parseInt(tabIndex) < 0)) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target is not included in the accessibility tree.`;
      evaluation.resultCode = 'RC1';
    } else {
      const accessibleName = await AccessibilityUtils.getAccessibleName(element, page);
      if (accessibleName && accessibleName.trim()) {
        evaluation.verdict = 'passed';
        evaluation.description = `The test target has an accessible name.`;
        evaluation.resultCode = 'RC2';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = `The test target doesn't have an accessible name.`;
        evaluation.resultCode = 'RC3';
      }
    }

    await super.addEvaluationResult(evaluation, element);
  }
}
export = QW_ACT_R19;
