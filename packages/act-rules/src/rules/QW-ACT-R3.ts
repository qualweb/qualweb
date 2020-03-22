'use strict';

import { ElementHandle } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { 
  ACTRule, 
  ElementExists, 
  IsDocument, 
  IsNotMathDocument, 
  ElementHasNonEmptyAttribute,
  IsLangSubTagValid
} from '../lib/decorator';

@ACTRule
class QW_ACT_R3 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  @IsDocument('html')
  @IsNotMathDocument
  @ElementHasNonEmptyAttribute('lang')
  @ElementHasNonEmptyAttribute('xml:lang')
  @IsLangSubTagValid('lang')
  @IsLangSubTagValid('xml:lang')
  async execute(element: ElementHandle): Promise<void> {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const lang = <string> await DomUtils.getElementAttribute(element, 'lang');
    const xmlLang = <string> await DomUtils.getElementAttribute(element, 'xml:lang');

    const primaryLang = lang.split('-')[0];
    const primaryXmlLang = xmlLang.split('-')[0];

    if (primaryLang.toLowerCase() === primaryXmlLang.toLowerCase()) {
      evaluation.verdict = 'passed';
      evaluation.description = `The \`lang\` and \`xml:lang\` attributes have the same value.`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = `The \`lang\` and \`xml:lang\` attributes don't have the same value.`;
      evaluation.resultCode = 'RC2';
    }
    
    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R3;