'use strict';

import { ElementHandle, Page } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';

@ACTRule
class QW_ACT_R29 extends Rule {

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

    const [isHidden, isVisible, controls, autoPlay, metadata] = await Promise.all([
      DomUtils.isElementHidden(element),
      DomUtils.isElementVisible(element),
      DomUtils.elementHasAttribute(element, 'controls'),
      DomUtils.getElementAttribute(element, 'autoplay'),
      DomUtils.getVideoMetadata(element)
    ]);

    const duration = metadata['puppeteer']['video']['duration'];

    if (duration > 0 && (!isHidden && isVisible && controls || autoPlay)) {
      evaluation.verdict = 'warning';
      evaluation.description = 'Check if the test target audio has text-alternative.';
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'The test target is not a non-streaming `audio` element with autoplay or a play button that is visisble and in the acessiblility tree.';
      evaluation.resultCode = 'RC2';
    }

    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R29;
