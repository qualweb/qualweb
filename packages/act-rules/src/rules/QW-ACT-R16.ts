'use strict';

import { ElementHandle, Page } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { 
  ACTRule, 
  ElementExists,
  ElementHasOneOfTheFollowingRoles,
  ElementIsInAccessibilityTree 
} from '../lib/decorator';

@ACTRule
class QW_ACT_R16 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  @ElementHasOneOfTheFollowingRoles(['checkbox', 'combobox', 'listbox', 'menuitemcheckbox', 'menuitemradio', 'radio', 'searchbox', 'slider', 'spinbutton', 'switch', 'textbox'])
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
      evaluation.description = `The test target has an accessible name.`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = `The test target accessible name doesn't exist or it's empty ("").`;
      evaluation.resultCode = 'RC2';
    }

    evaluation.accessibleName = accessibleName;

    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R16;