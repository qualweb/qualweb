'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';
import Rule from '../lib/AtomicRule.object';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
@ACTRuleDecorator
class QW_ACT_R58 extends Rule {
  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const isHidden = DomUtils.isElementHidden(element, page);
    const isVisible = DomUtils.isElementVisible(element, page);
    const autoPlay = element.getElementProperty('autoplay');

    if ((!isHidden && isVisible) || autoPlay) {
      evaluation.verdict = 'warning';
      evaluation.description = 'Check if the test target audio has text-alternative.';
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description =
        'The test target is not a non-streaming `audio` element with autoplay or a play button that is visisble and in the acessiblility tree.';
      evaluation.resultCode = 'RC2';
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R58;
