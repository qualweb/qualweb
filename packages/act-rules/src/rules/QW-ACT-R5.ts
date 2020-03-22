'use strict';

import { ElementHandle } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';
import languages from '../lib/language.json';
import Rule from '../lib/Rule.object';
import { 
  ACTRule, 
  ElementExists, 
  ElementHasNonEmptyAttribute, 
  IsDocument, 
  IsNotMathDocument 
} from '../lib/decorator';

@ACTRule
class QW_ACT_R5 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  @IsDocument('html')
  @IsNotMathDocument
  @ElementHasNonEmptyAttribute('lang')
  async execute(element: ElementHandle): Promise<void> {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const lang = <string> await DomUtils.getElementAttribute(element, 'lang');

    if (this.checkValidity(lang)) {
      evaluation.verdict = 'passed';
      evaluation.description = `The \`lang\´ attribute has a valid value.`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = 'The \`lang\` attribute does not have a valid value.';
      evaluation.resultCode = 'RC2';
    }

    await super.addEvaluationResult(evaluation, element);
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