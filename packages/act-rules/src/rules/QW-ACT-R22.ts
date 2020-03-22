'use strict';

import { ElementHandle } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';
import languages from '../lib/language.json';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';

@ACTRule
class QW_ACT_R22 extends Rule {

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
