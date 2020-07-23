'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import {QWElement} from "@qualweb/qw-element";
import {QWPage} from "@qualweb/qw-page";
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
@ACTRuleDecorator
class QW_ACT_R59 extends Rule {

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

    const isHidden = DomUtils.isElementHidden(element,page);
    const isVisible = DomUtils.isElementVisible(element,page);
    const controls = element.elementHasAttribute('controls');
    const autoPlay = element.getElementAttribute('autoplay');
    const metadata = DomUtils.getVideoMetadata(element);

    const duration = metadata['puppeteer']['video']['duration'];

    if (duration > 0 && (!isHidden && isVisible && controls || autoPlay)) {
      evaluation.verdict = 'warning';
      evaluation.description = 'Check if the test target audio is a media alternative for text.';
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'The test target is not a non-streaming `audio` element with autoplay or a play button that is visisble and in the acessiblility tree.';
      evaluation.resultCode = 'RC2';
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R59;
