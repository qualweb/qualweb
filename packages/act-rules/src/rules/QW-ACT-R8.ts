'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from '../lib/Rule.object';
import { 
  ACTRuleDecorator, 
  ElementExists,
  ElementIsInAccessibilityTree,
  ElementHasAttribute,
  ElementSrcAttributeFilenameEqualsAccessibleName
} from '../lib/decorator';
import { QWElement } from "@qualweb/qw-element";
import { QWPage } from '@qualweb/qw-page';

@ACTRuleDecorator
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

    evaluation.verdict = 'warning';
    evaluation.description = `This element's accessible name uses the filename.Check if it accurately describes the image.`;
    evaluation.resultCode = 'RC1';

    super.addEvaluationResult(evaluation, element,true,false,true,page);  }
}

export = QW_ACT_R8;
