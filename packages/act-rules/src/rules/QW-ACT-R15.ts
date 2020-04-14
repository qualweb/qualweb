'use strict';

import { ElementHandle } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';

@ACTRule
class QW_ACT_R15 extends Rule {

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
      evaluation.description = `The test target doesn't auto-play audio.`;
      evaluation.resultCode = 'RC1';
    } else if (metadata.service.error && metadata.puppeteer.error) {
      evaluation.verdict = 'warning';
      evaluation.description = `Can't collect data from the test target element.`;
      evaluation.resultCode = 'RC2';
    } else if(applicableServiceData || hasPupeteerApplicableData){
      if (controls) {
        evaluation.verdict = 'passed';
        evaluation.description = 'The test target has a visible control mechanism.';
        evaluation.resultCode = 'RC3';
      } else if (this.srcTimeIsLessThanThree(src)) {
        evaluation.verdict = 'passed';
        evaluation.description = 'The test target plays for 3 seconds or less.';
        evaluation.resultCode = 'RC4';
      } else {
        evaluation.verdict = 'warning';
        evaluation.description = 'Check if test target has a visible control mechanism.';
        evaluation.resultCode = 'RC5';
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target doesn't auto-play audio for 3 seconds.`;
      evaluation.resultCode = 'RC6';
    }

    await super.addEvaluationResult(evaluation, element);
  }

  private srcTimeIsLessThanThree(src: any[]): boolean {
    let result = false;
    for (const child of src || []) {
      if (child) {
        const values = String(child).split('#t=')
        if (values.length > 1) {
          const separatedValues = values[1].split(',');
          const value1 = Number(separatedValues[0]);
          const value2 = Number(separatedValues[1]);
          
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
