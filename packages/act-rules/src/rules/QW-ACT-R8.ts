'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from '../lib/Rule.object';
import {
  ACTRule,
  ElementExists,
  ElementIsInAccessibilityTree,
  ElementHasAttribute,
  ElementSrcAttributeFilenameEqualsAccessibleName
} from '../lib/decorator';
import { QWElement } from "@qualweb/qw-element";
import { QWPage } from '@qualweb/qw-page';
import { AccessibilityUtils } from '@qualweb/util';

@ACTRule
class QW_ACT_R8 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  @ElementIsInAccessibilityTree
  @ElementHasAttribute('src')
  @ElementSrcAttributeFilenameEqualsAccessibleName
  execute(element: QWElement, page: QWPage): void {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    evaluation.accessibleName = AccessibilityUtils.getAccessibleName(element, page);
    evaluation.verdict = 'warning';
    evaluation.description = `This element's accessible name uses the filename.Check if it accurately describes the image.`;
    evaluation.resultCode = 'RC1';

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R8;
