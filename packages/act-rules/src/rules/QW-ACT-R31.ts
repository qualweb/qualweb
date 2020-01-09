'use strict';

'use strict';

import { Page, ElementHandle } from 'puppeteer';
import Rule from './Rule.object';

import { ACTRuleResult } from '@qualweb/act-rules';

import {
  AccessibilityTreeUtils,
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

  async execute(element: ElementHandle | undefined, page: Page): Promise<void> {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (element === undefined) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = "No video elements";
      evaluation.resultCode = 'RC1';
    } else {
      let metadata = await DomUtils.getVideoMetadata(element);
      let hasPupeteerApplicableData = metadata.puppeteer.video.duration > 0;
      let applicableServiceData = metadata.service.video.duration > 0 && metadata.service.audio.duration === 0 && metadata.service.audio.volume === -91;
      let track = await element.$('track[kind="descriptions"]')
      let isVisible = await DomUtils.isElemenVisible(element);


      if (metadata.service.error && metadata.puppeteer.error) {
        evaluation.verdict = 'warning';
        evaluation.description = "Cant colect data from the video element";
        evaluation.resultCode = 'RC1';
      } else if (isVisible && applicableServiceData) {

        if (track !== null) {
          evaluation.verdict = 'warning';
          evaluation.description = "Check if the track element correctly describes the auditive content of the video";
          evaluation.resultCode = 'RC2';
        }
        else {
          evaluation.verdict = 'warning';
          evaluation.description = "Check if the video element auditive content has accessible alternative";
          evaluation.resultCode = 'RC3';
        }
      } else if (isVisible && hasPupeteerApplicableData) {
        evaluation.verdict = 'warning';
        evaluation.description = "Video has a sound track but we cant verify the volume.Check if the video has audio and if it does check if the video element visual content has an accessible alternative";
        evaluation.resultCode = 'RC4';

      } else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = "The video element isn't a non-streaming video element that is visible, where the video contains audio.";
        evaluation.resultCode = 'RC5';
      }
    }

    

    if (element !== undefined) {
      evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
      evaluation.pointer = await DomUtils.getElementSelector(element);
    }
    super.addEvaluationResult(evaluation);
  }
}

export = QW_ACT_R31;