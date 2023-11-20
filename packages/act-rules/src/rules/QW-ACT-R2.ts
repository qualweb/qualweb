import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, IsHTMLDocument, isInMainContext } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R2 extends AtomicRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
  }

  @ElementExists
  @IsHTMLDocument
  @isInMainContext
  execute(element: typeof window.qwElement): void {
    const lang = element.getElementAttribute('lang');

    const test = new Test();

    if (lang && lang.trim() !== '') {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }

    test.addElement(element, false);
    super.addTestResult(test);
  }
}

export = QW_ACT_R2;
