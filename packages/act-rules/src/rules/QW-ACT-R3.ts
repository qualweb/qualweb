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
  constructor(rule: ACTRule, locale: any) {
    super(rule, locale);
  }

  @ElementExists
  @IsHTMLDocument
  @ElementHasNonEmptyAttribute('lang')
  @ElementHasNonEmptyAttribute('xml:lang')
  @IsLangSubTagValid('lang')
  @IsLangSubTagValid('xml:lang')
  @isInMainContext
  execute(element: typeof window.qwElement): void {
    const lang = <string>element.getElementAttribute('lang');
    const xmlLang = <string>element.getElementAttribute('xml:lang');

    const primaryLang = lang.split('-')[0];
    const primaryXmlLang = xmlLang.split('-')[0];

    const test = new Test();

    if (primaryLang.toLowerCase() === primaryXmlLang.toLowerCase()) {
      test.verdict = 'passed';
      test.resultCode = 'RC1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'RC2';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_ACT_R3;
