'use strict';

import { ElementHandle } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';

class QW_ACT_R32 extends Rule {

  constructor() {
    super({
      name: 'video element visual content has strict accessible alternative',
      code: 'QW-ACT-R32',
      mapping: '1ec09b',
      description: 'This rule checks that video elements with audio have audio description.',
      metadata: {
        target: {
          element: 'video'
        },
        'success-criteria': [
          {
            name: '1.2.5',
            level: 'AA',
            principle: 'Perceivable ',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-description-prerecorded.html'
          }
        ],
        related: [],
        url: 'https://act-rules.github.io/rules/1ec09b',
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
    const isVisible = await DomUtils.isElemenVisible(element);

    if (metadata.service.error && metadata.puppeteer.error) {
      evaluation.verdict = 'warning';
      evaluation.description = `Can't colect data from the video element`;
      evaluation.resultCode = 'RC1';
    } else if (isVisible && applicableServiceData) {
      if (track !== null) {
        evaluation.verdict = 'warning';
        evaluation.description = 'Check if the track element correctly describes the auditive content of the video';
        evaluation.resultCode = 'RC2';
      } else {
        evaluation.verdict = 'warning';
        evaluation.description = 'Check if the video element auditive content has accessible alternative';
        evaluation.resultCode = 'RC3';
      }
    } else if (isVisible && hasPupeteerApplicableData) {
      evaluation.verdict = 'warning';
      evaluation.description = `Video has a sound track but we can't verify the volume. Check if the video has audio and if it does check if the video element visual content has an accessible alternative`;
      evaluation.resultCode = 'RC4';
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The video element isn't a non-streaming video element that is visible, where the video contains audio.`;
      evaluation.resultCode = 'RC5';
    }

    if (element) {
      const [htmlCode, pointer] = await Promise.all([
        DomUtils.getElementHtmlCode(element),
        DomUtils.getElementSelector(element)
      ]);

      evaluation.htmlCode = htmlCode;
      evaluation.pointer = pointer
    }
    
    super.addEvaluationResult(evaluation);
  }
}

export = QW_ACT_R32;
