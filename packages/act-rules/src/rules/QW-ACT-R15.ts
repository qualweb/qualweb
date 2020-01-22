'use strict';

import { ElementHandle } from 'puppeteer';
import Rule from './Rule.object';

import { ACTRuleResult } from '@qualweb/act-rules';

import { DomUtils } from '@qualweb/util';

class QW_ACT_R15 extends Rule {

  constructor() {
    super({
      name: 'audio or video has no audio that plays automatically',
      code: 'QW-ACT-R15',
      mapping: '80f0bf',
      description: 'This rule checks that auto-play audio does not last for more than 3 seconds, or the audio has a control mechanism to stop or mute it.',
      metadata: {
        target: {
          element: ['audio', 'video'],
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

    const [autoplay, paused, muted, srcATT, childSrc, controls, metadata] = await Promise.all([
      DomUtils.getElementAttribute(element, 'autoplay'),
      DomUtils.getElementAttribute(element, 'paused'),
      DomUtils.getElementAttribute(element, 'muted'),
      DomUtils.getElementAttribute(element, 'src'),
      element.$$('source[src]'),
      DomUtils.elementHasAttribute(element, 'controls'),
      DomUtils.getVideoMetadata(element)
    ]);
    
    const hasPupeteerApplicableData = metadata.puppeteer.video.duration > 3 && metadata.puppeteer.audio.hasSoundTrack;
    const applicableServiceData = metadata.service.audio.duration > 3 && metadata.service.audio.volume !== -91;

    const src = new Array<any>();

    if (childSrc.length > 0) {
      for (let child of childSrc || []) {
        src.push(DomUtils.getElementAttribute(child, 'src'));
      }
    } else { 
      src.push(srcATT) ;
    }

    if (autoplay !== 'true' || paused === 'true' || muted === 'true' || (!srcATT && childSrc.length === 0)) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The element doesn't auto-play audio`;
      evaluation.resultCode = 'RC1';
    } else if (metadata.service.error && metadata.puppeteer.error) {
      evaluation.verdict = 'warning';
      evaluation.description = `Can't colect data from the video element`;
      evaluation.resultCode = 'RC2';
    } else if(applicableServiceData || hasPupeteerApplicableData){
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
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The element doesn't auto-play audio for 3 seconds`;
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

  private srcTimeIsLessThanThree(src: any[]): boolean {
    let result = false;
    let values, separatedValues, value1, value2;
    for (const child of src || []) {
      if (child) {
        values = String(child).split('#t=')
        if (values.length > 1) {
          separatedValues = values[1].split(',');
          value1 = Number(separatedValues[0]);
          value2 = Number(separatedValues[1]);
          
          if (value1 && value2) {
            result = Math.abs(value1 - value2) <= 3;
          }
        }
      }
    }
    return result;
  }
}

export = QW_ACT_R15;
