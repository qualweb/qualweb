'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';
import {QWElement} from "@qualweb/qw-element";

@ACTRule
class QW_ACT_R15 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement): void {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const autoplay = element.getElementAttribute('autoplay');
    const paused = element.getElementAttribute('paused');
    const muted = element.getElementAttribute('muted');
    const srcAttr = element.getElementAttribute('src');
    const childSrc = element.getElements('source[src]');
    const controls = element.elementHasAttribute('controls');
    const metadata = DomUtils.getVideoMetadata(element);
    
    const hasPuppeteerApplicableData = metadata.puppeteer.video.duration > 3 && metadata.puppeteer.audio.hasSoundTrack;
    const src = new Array<any>();

    if (childSrc.length > 0) {
      for (let child of childSrc || []) {
        src.push(child.getElementAttribute( 'src'));
      }
    } else { 
      src.push(srcAttr) ;
    }

    if (autoplay !== 'true' || paused === 'true' || muted === 'true' || (!srcAttr && childSrc.length === 0)) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target doesn't auto-play audio.`;
      evaluation.resultCode = 'RC1';
    } else if ( metadata.puppeteer.error) {
      evaluation.verdict = 'warning';
      evaluation.description = `Can't collect data from the test target element.`;
      evaluation.resultCode = 'RC2';
    } else if( hasPuppeteerApplicableData){
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

    super.addEvaluationResult(evaluation, element);
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
