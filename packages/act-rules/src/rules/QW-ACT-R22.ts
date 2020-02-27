'use strict';

import { ElementHandle } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';
import languages from './language.json';

class QW_ACT_R22 extends Rule {

  constructor() {
    super({
      name: 'Element within body has valid lang attribute',
      code: 'QW-ACT-R22',
      mapping: 'de46e4',
      description: 'This rule checks that the lang attribute of an element in the page body has a valid primary language subtag.',
      metadata: {
        target: {
          element: 'body *',
          attribute: ['lang']
        },
        'success-criteria': [
          {
            name: '3.1.2',
            level: 'AA',
            principle: 'Understandable',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/language-of-parts'
          }
        ],
        related: [],
        url: 'https://act-rules.github.io/rules/de46e4',
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

    const lang = await DomUtils.getElementAttribute(element, 'lang');

    let subtag = '';
    let splittedlang = new Array<string>();
    if(lang){
      splittedlang = lang.split('-');
      subtag = splittedlang[0];
    }

    if (!subtag.trim()) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'The test target `lang` attribute is empty ("").';
      evaluation.resultCode = 'RC1';
    } else if (this.isSubTagValid(subtag) && splittedlang.length <= 2) {
      evaluation.verdict = 'passed';
      evaluation.description = 'The test target has a valid `lang` attribute.';
      evaluation.resultCode = 'RC2';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = 'The test target has an invalid `lang` attribute.';
      evaluation.resultCode = 'RC3';
    }

    await super.addEvaluationResult(evaluation, element);
  }

  private isSubTagValid(subTag: string): boolean {
    return languages.hasOwnProperty(subTag);
  }
}

export = QW_ACT_R22;
