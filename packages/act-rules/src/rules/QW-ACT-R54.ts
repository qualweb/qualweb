'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import {QWElement} from "@qualweb/qw-element";
import { QWPage } from '@qualweb/qw-page';

@ACTRuleDecorator
class QW_ACT_R54 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement,page:QWPage): void {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const metadata = DomUtils.getVideoMetadata(element);
    const isVisible = DomUtils.isElementVisible(element,page);

    const hasPuppeteerApplicableData = metadata.puppeteer.video.duration > 0  && !metadata.puppeteer.audio.hasSoundTrack;

    if (!isVisible) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'The video is not visible';
      evaluation.resultCode = 'RC1';
    } else if ( metadata.puppeteer.error) {
      evaluation.verdict = 'warning';
      evaluation.description = 'Cant colect data from the test target.';
      evaluation.resultCode = 'RC2';
    } else if (hasPuppeteerApplicableData) {
      evaluation.verdict = 'warning';
      evaluation.description = `Check if visual content has an accessible alternative.`;
      evaluation.resultCode = 'RC3';
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target isn't a non-streaming \`video\` element that is visible, where the video contains audio.`;
      evaluation.resultCode = 'RC4';
    }
    
    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R54;
