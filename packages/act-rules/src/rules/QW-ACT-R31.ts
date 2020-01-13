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
      mapping: '2ee8b8',
      description: 'This rule checks that video elements without audio have an alternative available.',
      metadata: {
        target: {
          element: 'video'
        },
        'success-criteria': [],
        related: [],
        url: 'https://act-rules.github.io/rules/c3232f',
        passed: 0,
        warning: 0,
        failed: 0,
        inapplicable: 0,
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
      DomUtils.isElemenVisible(element)
    ]);

    const hasPupeteerApplicableData = metadata.puppeteer.video.duration > 0;
    const applicableServiceData = metadata.service.video.duration > 0 && metadata.service.audio.volume === -91;

    if (!isVisible) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = "The pause button is not visible";
      evaluation.resultCode = 'RC1';
    } else if (metadata.service.error && metadata.puppeteer.error) {
      evaluation.verdict = 'warning';
      evaluation.description = "Cant colect data from the video element";
      evaluation.resultCode = 'RC2';
    } else if (applicableServiceData) {
      if (track !== null) {
        evaluation.verdict = 'warning';
        evaluation.description = "Check if the track element correctly describes the visual content of the video";
        evaluation.resultCode = 'RC3';
      } else {
        evaluation.verdict = 'warning';
        evaluation.description = "Check if the video element visual content has accessible alternative";
        evaluation.resultCode = 'RC4';
      }
    } else if (hasPupeteerApplicableData) {
      evaluation.verdict = 'warning';
      evaluation.description = "Video has a sound track but we cant verify the volume.Check if the video has audio and if it does check if the video element visual content has an accessible alternative";
      evaluation.resultCode = 'RC5';

    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = "The video element isn't a non-streaming video element that is visible, where the video contains audio.";
      evaluation.resultCode = 'RC6';
    }

    if (element) {
      const [htmlCode, pointer] = await Promise.all([
        DomUtils.getElementHtmlCode(element),
        DomUtils.getElementSelector(element)
      ]);
      evaluation.htmlCode = htmlCode;
      evaluation.pointer = pointer;
    }
    
    super.addEvaluationResult(evaluation);
  }
}

export = QW_ACT_R31;