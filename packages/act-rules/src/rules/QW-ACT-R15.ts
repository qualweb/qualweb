'use strict';

import { ElementHandle } from 'puppeteer';
import Rule from './Rule.object';

import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';

import { DomUtils as DomUtil } from '@qualweb/util';
const rule: ACTRule = {
  name: 'audio or video has no audio that plays automatically',
  code: 'QW-ACT-R15',
  mapping: '80f0bf',
  description: 'This rule checks that auto-play audio does not last for more than 3 seconds, or the audio has a control mechanism to stop or mute it.',
  metadata: {
    target: {
      element: 'audio,video',
    },
    'success-criteria': [
      {
        name: '1.4.2',
        level: 'A',
        principle: 'Perceivable',
        url: 'https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-dis-audio.html'
      }
    ],
    related: [],
    url: 'https://act-rules.github.io/rules/80f0bf',
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

class QW_ACT_R15 extends Rule {

  constructor() {
    super(rule);
  }

  async execute(element: ElementHandle | undefined): Promise<void> {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (element === undefined) { // if the element doesn't exist, there's nothing to test
      evaluation.verdict = 'inapplicable';
      evaluation.description = `no audio or video element exist`;
      evaluation.resultCode = 'RC1';
    } else {
      let autoplay = await DomUtil.getElementAttribute(element, "autoplay");
      let paused = await DomUtil.getElementAttribute(element, "paused");
      let muted = await DomUtil.getElementAttribute(element, "muted");
      let srcATT = await DomUtil.getElementAttribute(element, "src");
      let childSrc = await element.$$("source[src]");
  
      let controls = await DomUtil.elementHasAttribute(element, "controls");
      let metadata = await DomUtil.getVideoMetadata(element);
      console.log(metadata)
      let hasPupeteerApplicableData = metadata.puppeteer.video.duration > 3 && metadata.puppeteer.audio.hasSoundTrack;
      let applicableServiceData = metadata.service.audio.duration > 3 && metadata.service.audio.volume !== -91;

      let src: any[] = [];

      if (childSrc.length > 0) {
        for (let child of childSrc) {
          src.push(DomUtil.getElementAttribute(child, "src"));
        }
      } else { src.push(srcATT) }

     

      if (autoplay !== "true" || paused === "true" || muted === "true" || (!srcATT && childSrc.length === 0)) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'The element doesnt auto-play audio';
        evaluation.resultCode = 'RC1';
      } else if (metadata.service.error&&metadata.puppeteer.error) {
        evaluation.verdict = 'warning';
        evaluation.description = "Cant colect data from the video element";
        evaluation.resultCode = 'RC2';
      } else if(applicableServiceData||hasPupeteerApplicableData){
        if (controls) {
        evaluation.verdict = 'passed';
        evaluation.description = 'The auto-play element has a visible control mechanism';
        evaluation.resultCode = 'RC3';
      } else if (this.srcTimeIsLessThanThree(src)) {
        evaluation.verdict = 'passed';
        evaluation.description = 'The auto-play element plays for 3 seconds or less';
        evaluation.resultCode = 'RC4';
      } else {
        evaluation.verdict = 'warning';
        evaluation.description = 'Check if auto-play has a visible control mechanism';
        evaluation.resultCode = 'RC5';


      }}else{
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'The element doesnt auto-play audio for 3 seconds';
        evaluation.resultCode = 'RC6';
      }

      console.log(evaluation.resultCode)

      if (element !== undefined) {
        evaluation.htmlCode = await DomUtil.getElementHtmlCode(element);
        evaluation.pointer = await DomUtil.getElementSelector(element);
      }

      super.addEvaluationResult(evaluation);
    }

  }

  private srcTimeIsLessThanThree(src: any[]): boolean {
    let result = false;
    let values, separatedValues, value1, value2;
    for (let child of src) {
      console.log(child);
      if (child !== undefined) {
        values = String(child).split("#t=")
        if (values.length > 1) {
          separatedValues = values[1].split(",");
          value1 = Number(separatedValues[0]);
          value2 = Number(separatedValues[1]);
          console.log(separatedValues);
          console.log(value1 + "/" + value2);
          if (value1 && value2)
            result = Math.abs(value1 - value2) <= 3;
        }
      }

    }
    return result;
  }


}

export = QW_ACT_R15;
