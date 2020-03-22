'use strict';

import { ElementHandle } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';

@ACTRule
class QW_ACT_R26 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  async execute(element: ElementHandle): Promise<void> {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const [track, isVisible, metadata] = await Promise.all([
      element.$('track[kind="captions"]'),
      DomUtils.isElementVisible(element),
      DomUtils.getVideoMetadata(element)
    ]);

    const hasPupeteerApplicableData = metadata.puppeteer.video.duration > 0 && metadata.puppeteer.audio.hasSoundTrack;
    const applicableServiceData = metadata.service.video.duration > 0 && metadata.service.audio.duration > 0 && metadata.service.audio.volume !== -91;

    if (metadata.service.error && metadata.puppeteer.error) {
      evaluation.verdict = 'warning';
      evaluation.description = `Can't colect any data from the test target.`;
      evaluation.resultCode = 'RC1';
    } else if (isVisible && applicableServiceData) {
      if (track !== null) {
        evaluation.verdict = 'warning';
        evaluation.description = 'Check if the \`track\` element correctly describes the auditive content of the video.';
        evaluation.resultCode = 'RC1';
      } else {
        evaluation.verdict = 'warning';
        evaluation.description = 'Check if the test target auditive content has an accessible alternative.';
        evaluation.resultCode = 'RC2';
      }
    } else if (isVisible && hasPupeteerApplicableData) {
      evaluation.verdict = 'warning';
      evaluation.description = 'The test target has a sound track but we can verify the volume. Check if the test target has audio and if it does check if the auditive content has an accessible alternative.';
      evaluation.resultCode = 'RC3';
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target isn't a non-streaming \`video\` element that is visible, where the video contains audio.`;
      evaluation.resultCode = 'RC4';
    }

    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R26;
