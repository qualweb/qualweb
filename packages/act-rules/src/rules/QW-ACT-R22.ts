'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import languages from '../lib/language.json';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import {QWElement} from "@qualweb/qw-element";

@ACTRuleDecorator
class QW_ACT_R22 extends Rule {

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

    const lang = element.getElementAttribute('lang');

    let subtag = '';
    let splittedLang = new Array<string>();
    if(lang){
      splittedLang = lang.split('-');
      subtag = splittedLang[0];
    }

    if (!subtag.length) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'The test target `lang` attribute is empty ("").';
      evaluation.resultCode = 'RC1';
    } else if (this.isSubTagValid(subtag)) {
      evaluation.verdict = 'passed';
      evaluation.description = 'The test target has a valid `lang` attribute.';
      evaluation.resultCode = 'RC2';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = 'The test target has an invalid `lang` attribute.';
      evaluation.resultCode = 'RC3';
    }

    super.addEvaluationResult(evaluation, element);
  }

  private isSubTagValid(subTag: string): boolean {
    return languages.hasOwnProperty(subTag);
  }
}

export = QW_ACT_R22;
