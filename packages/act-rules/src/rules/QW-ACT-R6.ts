'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists, ElementIsInAccessibilityTree, IsHTMLDocument } from '../lib/decorator';
import { QWElement } from "@qualweb/qw-element";
import { QWPage } from "@qualweb/qw-page";

@ACTRuleDecorator
class QW_ACT_R6 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  @IsHTMLDocument
  @ElementIsInAccessibilityTree
  execute(element: QWElement, page: QWPage): void {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const accessibleName = AccessibilityUtils.getAccessibleName(element, page);
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
    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R6;
