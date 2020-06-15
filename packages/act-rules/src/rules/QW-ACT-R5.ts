'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import languages from '../lib/language.json';
import Rule from '../lib/Rule.object';
import { 
  ACTRule, 
  ElementExists, 
  ElementHasNonEmptyAttribute,
  IsHTMLDocument,  
} from '../lib/decorator';
import {QWElement} from "@qualweb/qw-element";

@ACTRule
class QW_ACT_R5 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  @IsHTMLDocument
  @ElementHasNonEmptyAttribute('lang')
  execute(element: QWElement): void {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const lang = <string> element.getElementAttribute('lang');

    if (this.checkValidity(lang)) {
      evaluation.verdict = 'passed';
      evaluation.description = `The \`lang\` attribute has a valid value.`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = 'The \`lang\` attribute does not have a valid value.';
      evaluation.resultCode = 'RC2';
    }

    super.addEvaluationResult(evaluation, element);
  }

  private checkValidity(lang: string): boolean {
    const subLangs = lang.split('-');
    
    /*if (subLangs.length > 2) {
      return false;
    }*/

    return this.isSubTagValid(subLangs[0]);
  }

  private isSubTagValid(subTag: string): boolean {
    return languages.hasOwnProperty(subTag);
  }
}

export = QW_ACT_R5;
