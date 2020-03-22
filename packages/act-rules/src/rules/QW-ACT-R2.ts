'use strict';

import { ElementHandle } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists, IsDocument, IsNotMathDocument } from '../lib/decorator';

@ACTRule
class QW_ACT_R2 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  @IsDocument('html')
  @IsNotMathDocument
  async execute(element: ElementHandle): Promise<void> {
    
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    }

    const lang = await DomUtils.getElementAttribute(element, 'lang');

    if (lang && lang.trim()) {
      evaluation.verdict = 'passed';
      evaluation.description = `The \`lang\` attribute exists and has a value.`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = `The \`lang\` attribute doesn't exist or is empty ("").`;
      evaluation.resultCode = 'RC2';
    }

    await super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R2;