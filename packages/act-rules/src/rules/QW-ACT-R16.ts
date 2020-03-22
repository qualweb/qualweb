'use strict';

import { ElementHandle, Page } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';

@ACTRule
class QW_ACT_R16 extends Rule {

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

    const semanticRoles = ['checkbox', 'combobox', 'listbox', 'menuitemcheckbox', 'menuitemradio', 'radio', 'searchbox', 'slider', 'spinbutton', 'switch', 'textbox'];

    const role = await AccessibilityUtils.getElementRole(element,page);

    if (!!role && semanticRoles.includes(role)) {
      const inAt = await AccessibilityUtils.isElementInAT(element, page);
      if (inAt) {
        const accessibleName = await AccessibilityUtils.getAccessibleName(element, page);
        if (accessibleName && accessibleName.trim()) {
          evaluation.verdict = 'passed';
          evaluation.description = `The test target has an accessible name.`;
          evaluation.resultCode = 'RC1';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = `The test target accessible name doesn't exist or it's empty ("").`;
          evaluation.resultCode = 'RC2';
        }
      } else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The test target has an accessible name but it's hidden.`;
        evaluation.resultCode = 'RC3';
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The \`role\` has explicitly been set to something that isn't a form field.`;
      evaluation.resultCode = 'RC4';
    }

    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R16;