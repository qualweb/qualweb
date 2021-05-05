import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, ElementHasAttribute, ElementIsVisibleOrInAccessibilityTree } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R22 extends AtomicRule {
  constructor(rule: ACTRule, locale: any) {
    super(rule, locale);
  }

  @ElementExists
  @ElementIsVisibleOrInAccessibilityTree
  @ElementHasAttribute('lang')
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const lang = (<string>element.getElementAttribute('lang')).toLowerCase();
    const subTag = lang.split('-')[0];

    if (lang !== '') {
      if (this.isSubTagValid(subTag)) {
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

  private isSubTagValid(subTag: string): boolean {
    const languages = window.AccessibilityUtils.languages;
    return languages.hasOwnProperty(subTag);
  }
}

export = QW_ACT_R22;
