'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';
import Rule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';

@ACTRuleDecorator
class QW_ACT_R50 extends Rule {
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

    const autoplay = element.getElementProperty('autoplay');
    const paused = element.getElementAttribute('paused');
    const muted = element.getElementProperty('muted');
    const srcAttr = element.getElementAttribute('src');
    const childSrc = element.getElements('source[src]');
    const controls = element.getElementProperty('controls');
    const duration = parseInt(element.getElementProperty('duration'));
    const hasSoundTrack = DomUtils.videoElementHasAudio(element);
    const hasPuppeteerApplicableData = duration > 3 && hasSoundTrack;
    const src = new Array<any>();

    if (childSrc.length > 0) {
      for (const child of childSrc || []) {
        src.push(child.getElementAttribute('src'));
      }
    } else {
      src.push(srcAttr);
    }

    if (!autoplay || paused || muted || (!srcAttr && childSrc.length === 0)) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target doesn't auto-play audio.`;
      evaluation.resultCode = 'RC1';
    } else if (!(duration >= 0 && hasSoundTrack)) {
      evaluation.verdict = 'warning';
      evaluation.description = `Can't collect data from the test target element.`;
      evaluation.resultCode = 'RC2';
    } else if (hasPuppeteerApplicableData) {
      if (controls) {
        evaluation.verdict = 'passed';
        evaluation.description = 'The test target has a visible control mechanism.';
        evaluation.resultCode = 'RC3';
      } else {
        evaluation.verdict = 'warning';
        evaluation.description = 'Check if test target has a visible control mechanism.';
        evaluation.resultCode = 'RC4';
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target doesn't auto-play audio for 3 seconds.`;
      evaluation.resultCode = 'RC5';
    }
    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R50;
