import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from '../lib/Rule.object';
import { 
  ACTRuleDecorator, 
  ElementExists, 
  ElementHasNonEmptyAttribute,
  IsLangSubTagValid,
  IsHTMLDocument,
  isInMainContext
} from '../lib/decorator';
import {QWElement} from "@qualweb/qw-element";

@ACTRuleDecorator
class QW_ACT_R3 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  @IsHTMLDocument
  @ElementHasNonEmptyAttribute('lang')
  @ElementHasNonEmptyAttribute('xml:lang')
  @IsLangSubTagValid('lang')
  @IsLangSubTagValid('xml:lang')
  @isInMainContext
  execute(element: QWElement): void {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const lang = <string> element.getElementAttribute('lang');
    const xmlLang = <string> element.getElementAttribute('xml:lang');

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
    
    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R3;
