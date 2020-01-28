'use strict';

import { ElementHandle } from 'puppeteer';
import Rule from './Rule.object';

import { ACTRuleResult } from '@qualweb/act-rules';

import {
  DomUtils
} from '@qualweb/util';

class QW_ACT_R31 extends Rule {

  constructor() {
    super({
      name: 'Video element visual-only content has accessible alternative',
      code: 'QW-ACT-R31',
      mapping: 'c3232f',
      description: 'This rule checks that video elements without audio have an alternative available.',
      metadata: {
        target: {
          element: 'video'
        },
        'success-criteria': [
          {
            name: '1.2.1',
            level: 'A',
            principle: 'Perceivable',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-only-and-video-only-prerecorded'
          }
        ],
        related: [],
        url: 'https://act-rules.github.io/rules/c3232f',
        passed: 0,
        warning: 0,
        failed: 0,
        type: ['ACTRule', 'TestCase'],
        a11yReq: ['WCAG21:title'],
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

    const [metadata, track, isVisible] = await Promise.all([
      DomUtils.getVideoMetadata(element),
      element.$('track[kind="descriptions"]'),
      DomUtils.isElementVisible(element)
    ]);

    const hasPupeteerApplicableData = metadata.puppeteer.video.duration > 0;
    const applicableServiceData = metadata.service.video.duration > 0 && metadata.service.audio.volume === -91;

    if (!isVisible) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'The pause button is not visible';
      evaluation.resultCode = 'RC1';
    } else if (metadata.service.error && metadata.puppeteer.error) {
      evaluation.verdict = 'warning';
      evaluation.description = 'Cant colect data from the test target.';
      evaluation.resultCode = 'RC2';
    } else if (applicableServiceData) {
      if (track !== null) {
        evaluation.verdict = 'warning';
        evaluation.description = 'Check if the `track` element correctly describes the visual content of the video.';
        evaluation.resultCode = 'RC3';
      } else {
        evaluation.verdict = 'warning';
        evaluation.description = 'Check if the test target visual content has accessible alternative.';
        evaluation.resultCode = 'RC4';
      }
    } else if (hasPupeteerApplicableData) {
      evaluation.verdict = 'warning';
      evaluation.description = `The test target has a sound track but we can't verify the volume. Check if the test target has audio and if it does check if visual content has an accessible alternative.`;
      evaluation.resultCode = 'RC5';

    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target isn't a non-streaming \`video\` element that is visible, where the video contains audio.`;
      evaluation.resultCode = 'RC6';
    }
    
    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R31;
