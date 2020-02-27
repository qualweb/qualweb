'use strict';

import { ElementHandle } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';

class QW_ACT_R23 extends Rule {

  constructor() {
    super({
      name: 'video element visual content has accessible alternative',
      code: 'QW-ACT-R23',
      mapping: 'c5a4ea',
      description: 'This rule checks that video elements with audio have an alternative for the video content as audio or as text.',
      metadata: {
        target: {
          element: 'video'
        },
        'success-criteria': [
          {
            name: '1.2.3',
            level: 'A',
            principle: 'Perceivable ',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-description-or-media-alternative-prerecorded.html'
          }
        ],
        related: [],
        url: 'https://act-rules.github.io/rules/c5a4ea',
        passed: 0,
        warning: 0,
        failed: 0,
        type: ['ACTRule', 'TestCase'],
        a11yReq: ['WCAG21:language'],
        outcome: '',
        description: ''
      },
      results: new Array<ACTRuleResult>()
    });
  }

  async execute(element: ElementHandle | undefined): Promise<void> {

    if (!element) {
      return;
    }

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const metadata = await DomUtils.getVideoMetadata(element);
    const hasPupeteerApplicableData = metadata.puppeteer.video.duration > 0 && metadata.puppeteer.audio.hasSoundTrack;
    const applicableServiceData = metadata.service.video.duration > 0 && metadata.service.audio.duration > 0 && metadata.service.audio.volume !== -91;
    const track = await element.$('track[kind="descriptions"]')
    const isVisible = await DomUtils.isElementVisible(element);

    if (metadata.service.error && metadata.puppeteer.error) {
      evaluation.verdict = 'warning';
      evaluation.description = `Can't colect data from the test target.`;
      evaluation.resultCode = 'RC1';
    } else if (isVisible && applicableServiceData) {
      if (track !== null) {
        evaluation.verdict = 'warning';
        evaluation.description = 'Check if the `track` element correctly describes the auditive content of the video.';
        evaluation.resultCode = 'RC2';
      } else {
        evaluation.verdict = 'warning';
        evaluation.description = 'Check if the test target auditive content has and accessible alternative.';
        evaluation.resultCode = 'RC3';
      }
    } else if (isVisible && hasPupeteerApplicableData) {
      evaluation.verdict = 'warning';
      evaluation.description = `The test target has a sound track but we can't verify the volume. Check if the test target has audio and if it does, check if the visual content has an accessible alternative.`;
      evaluation.resultCode = 'RC4';
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target isn't a non-streaming \`video\` element that is visible, where the video contains audio.`;
      evaluation.resultCode = 'RC5';
    }
    
    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R23;
