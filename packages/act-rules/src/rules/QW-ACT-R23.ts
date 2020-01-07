'use strict';

import {ElementHandle} from 'puppeteer';
import Rule from './Rule.object';
import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';

const rule: ACTRule = {
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
    inapplicable: 0,
    failed: 0,
    type: ['ACTRule', 'TestCase'],
    a11yReq: ['WCAG21:language'],
    outcome: '',
    description: ''
  },
  results: new Array<ACTRuleResult>()
};

class QW_ACT_R23 extends Rule {

  constructor() {
    super(rule);
  }

  async execute(element: ElementHandle | undefined): Promise<void> {


    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (element === undefined) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = "No elements with lang";
      evaluation.resultCode = 'RC1';
    } else {
      let metadata = await DomUtils.getVideoMetadata(element);
      let hasPupeteerApplicableData = metadata.puppeteer.video.duration > 0 && metadata.puppeteer.audio.hasSoundTrack;
      let applicableServiceData = metadata.service.video.duration > 0 && metadata.service.audio.duration > 0 && metadata.service.audio.volume !== -91;
      let track = await element.$('track[kind="descriptions"]')
      let isVisible = await DomUtils.isElemenVisible(element);
      console.log(metadata)


      if (!((metadata.service.error) || (metadata.puppeteer.error))) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = "Cant colect data from the video element";
        evaluation.resultCode = 'RC1';
      } else if (isVisible && applicableServiceData) {

        if (track !== null) {
          evaluation.verdict = 'warning';
          evaluation.description = "Check if the track element correctly describes the auditive content of the video";
          evaluation.resultCode = 'RC1';
        }
        else {
          evaluation.verdict = 'warning';
          evaluation.description = "Check if the video element auditive content has accessible alternative";
          evaluation.resultCode = 'RC2';
        }
      } else if (isVisible && hasPupeteerApplicableData) {
        evaluation.verdict = 'warning';
        evaluation.description = "Video has a sound track but we cant verify the volume.Check if the video has audio and if it does check if the video element visual content has an accessible alternative";
        evaluation.resultCode = 'RC3';

      } else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = "The video element isn't a non-streaming video element that is visible, where the video contains audio.";
        evaluation.resultCode = 'RC4';
      }
    }
    console.log(evaluation.resultCode)
    

    if (element !== undefined) {
      evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
      evaluation.pointer = await DomUtils.getElementSelector(element);
    }
    super.addEvaluationResult(evaluation);
  }


}

export = QW_ACT_R23;
