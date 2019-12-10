'use strict';

import {ElementHandle} from 'puppeteer';
import Rule from './Rule.object';
import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';

const rule: ACTRule = {
  name: 'video element auditory content has accessible alternative',
  code: 'QW-ACT-R26',
  mapping: 'eac66b',
  description: 'This rule checks that video elements have an alternative for information conveyed through audio.',
  metadata: {
    target: {
      element: 'video'
    },
    'success-criteria': [
      {
        name: '1.2.2',
        level: 'A',
        principle: 'Perceivable ',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/captions-prerecorded.html'
      }
    ],
    related: [],
    url: 'https://act-rules.github.io/rules/eac66b',
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

class QW_ACT_R26 extends Rule {

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
      evaluation.description = "No video element";
      evaluation.resultCode = 'RC1';
    } else {
      let duration = await  element.evaluate(elem => { return elem['duration']; });
      let hasSoundTrack = await DomUtils.videoElementHasAudio(element);
      let track = await element.$('track[kind="captions"]')
      let isVisible = await DomUtils.isVisible(element);



      if (!(duration > 0 && hasSoundTrack&&isVisible)) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = "The video element isn't a non-streaming video element that is visible, where the video contains audio.";
        evaluation.resultCode = 'RC1';
      }
      else if (track!== null) {
        evaluation.verdict = 'warning';
        evaluation.description = "Check if the track element correctly describes the auditive content of the video";
        evaluation.resultCode = 'RC2';
      }
      else {
        evaluation.verdict = 'warning';
        evaluation.description = "Check if the video element auditive content has accessible alternative";
        evaluation.resultCode = 'RC3';
      }
    }

    if (element !== undefined) {
      evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
      evaluation.pointer = await DomUtils.getElementSelector(element);
    }
    super.addEvaluationResult(evaluation);
  }


}

export = QW_ACT_R26;