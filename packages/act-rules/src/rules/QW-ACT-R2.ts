'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists, IsHTMLDocument} from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';


@ACTRule
class QW_ACT_R2 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  @IsHTMLDocument
  execute(element: QWElement,page:QWPage): void {
    
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const lang = element.getElementAttribute('lang');

    if (lang && lang.trim()) {
      evaluation.verdict = 'passed';
      evaluation.description = `The \`lang\` attribute exists and has a value.`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = `The \`lang\` attribute doesn't exist or is empty ("").`;
      evaluation.resultCode = 'RC2';
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R2;
