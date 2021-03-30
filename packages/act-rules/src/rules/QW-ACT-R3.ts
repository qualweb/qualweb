import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import {
  ACTRuleDecorator,
  ElementExists,
  ElementHasNonEmptyAttribute,
  IsLangSubTagValid,
  IsHTMLDocument,
  isInMainContext
} from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R3 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  @IsHTMLDocument
  @ElementHasNonEmptyAttribute('lang')
  @ElementHasNonEmptyAttribute('xml:lang')
  @IsLangSubTagValid('lang')
  @IsLangSubTagValid('xml:lang')
  @isInMainContext
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const lang = <string>element.getElementAttribute('lang');
    const xmlLang = <string>element.getElementAttribute('xml:lang');

    const primaryLang = lang.split('-')[0];
    const primaryXmlLang = xmlLang.split('-')[0];

    if (primaryLang.toLowerCase() === primaryXmlLang.toLowerCase()) {
      test.verdict = 'passed';
      test.description = `The \`lang\` and \`xml:lang\` attributes have the same value.`;
      test.resultCode = 'RC1';
    } else {
      test.verdict = 'failed';
      test.description = `The \`lang\` and \`xml:lang\` attributes don't have the same value.`;
      test.resultCode = 'RC2';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_ACT_R3;
