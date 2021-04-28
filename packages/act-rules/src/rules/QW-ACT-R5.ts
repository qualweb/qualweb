import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, ElementHasNonEmptyAttribute, IsHTMLDocument } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R5 extends AtomicRule {
  constructor(rule: ACTRule, locale: any) {
    super(rule, locale);
  }

  @ElementExists
  @IsHTMLDocument
  @ElementHasNonEmptyAttribute('lang')
  execute(element: typeof window.qwElement): void {
    const lang = <string>element.getElementAttribute('lang');

    const test = new Test();

    if (this.checkValidity(lang)) {
      test.verdict = 'passed';
      test.resultCode = 'RC1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'RC2';
    }

    test.addElement(element);
    super.addTestResult(test);
  }

  private checkValidity(lang: string): boolean {
    const subLangs = lang.split('-');
    return this.isSubTagValid(subLangs[0]);
  }

  private isSubTagValid(subTag: string): boolean {
    const languages = window.AccessibilityUtils.languages;
    return languages.hasOwnProperty(subTag);
  }
}

export = QW_ACT_R5;
