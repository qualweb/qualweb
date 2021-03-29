import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, ElementIsVisibleOrInAccessibilityTree } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R22 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  @ElementIsVisibleOrInAccessibilityTree
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const lang = element.getElementAttribute('lang');

    let subTag = '';
    let langs = new Array<string>();
    if (lang) {
      const langLowercase = lang.toLowerCase();
      langs = langLowercase.split('-');
      subTag = langs[0];
    }

    if (subTag.length && this.isSubTagValid(subTag)) {
      test.verdict = 'passed';
      test.description = 'The test target has a valid `lang` attribute.';
      test.resultCode = 'RC2';
    } else {
      test.verdict = 'failed';
      test.description = 'The test target has an invalid `lang` attribute.';
      test.resultCode = 'RC3';
    }
      

    test.addElement(element);
    super.addTestResult(test);
  }

  private isSubTagValid(subTag: string): boolean {
    const languages = window.AccessibilityUtils.languages;
    return languages.hasOwnProperty(subTag);
  }
}

export = QW_ACT_R22;
