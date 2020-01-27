'use strict';

import { ElementHandle, Page } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';

class QW_ACT_R29 extends Rule {

  constructor() {
    super({
      name: 'Audio element content has text alternative',
      code: 'QW-ACT-R29',
      mapping: 'e7aa44',
      description: 'This rule checks if audio only elements have a text alternative available.',
      metadata: {
        target: {
          element: '*',
          attributes: 'role'
        },
        'success-criteria': [
          {
            name: '1.2.1',
            level: 'A',
            principle: 'Perceivable ',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-only-and-video-only-prerecorded'
          }
        ],
        related: [],
        url: 'https://act-rules.github.io/rules/e7aa44',
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

  async execute(element: ElementHandle | undefined, page: Page): Promise<void> {

    if (!element) {
      return;
    }

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const [isHidden, isVisible, controls, autoPlay, metadata] = await Promise.all([
      DomUtils.isElementHidden(element, page),
      DomUtils.isElemenVisible(element, page),
      DomUtils.elementHasAttribute(element, 'controls'),
      DomUtils.getElementAttribute(element, 'autoplay'),
      DomUtils.getVideoMetadata(element)
    ]);

    const duration = metadata['puppeteer']['video']['duration'];

    if (duration > 0 && (!isHidden && isVisible && controls || autoPlay)) {
      evaluation.verdict = 'warning';
      evaluation.description = 'Check if the test target audio has text-alternative.';
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'The test target is not a non-streaming `audio` element with autoplay or a play button that is visisble and in the acessiblility tree.';
      evaluation.resultCode = 'RC2';
    }

    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R29;
