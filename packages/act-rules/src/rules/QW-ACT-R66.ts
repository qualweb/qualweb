'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils } from '@qualweb/util';
import Rule from '../lib/AtomicRule.object';
import {
  ACTRuleDecorator,
  ElementExists,
  ElementIsInAccessibilityTree,
  ElementHasOneOfTheFollowingRoles
} from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';

@ACTRuleDecorator
class QW_ACT_R66 extends Rule {
  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  @ElementIsInAccessibilityTree
  @ElementHasOneOfTheFollowingRoles(['menuitem'])
  execute(element: QWElement, page: QWPage): void {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const accessibleName = AccessibilityUtils.getAccessibleName(element, page);
    if (accessibleName) {
      evaluation.verdict = 'passed';
      evaluation.description = 'The test target has a non-empty accessible name.';
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = `The test target accessible name doesn't exist or it's empty ("").`;
      evaluation.resultCode = 'RC2';
    }

    super.addEvaluationResult(evaluation, element, true, false, true, page);
  }
}

export = QW_ACT_R66;
