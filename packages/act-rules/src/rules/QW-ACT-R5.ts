import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, ElementHasNonEmptyAttribute, IsHTMLDocument } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R5 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  @IsHTMLDocument
  @ElementHasNonEmptyAttribute('lang')
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const lang = <string>element.getElementAttribute('lang');

    if (this.checkValidity(lang)) {
      test.verdict = 'passed';
      test.description = `The \`lang\` attribute has a valid value.`;
      test.resultCode = 'RC1';
    } else {
      test.verdict = 'failed';
      test.description = 'The `lang` attribute does not have a valid value.';
      test.resultCode = 'RC2';
    }

    test.addElement(element);
    super.addTestResult(test);
  }

  private checkValidity(lang: string): boolean {
    const subLangs = lang.split('-');

    /*if (subLangs.length > 2) {
      return false;
    }*/

    return this.isSubTagValid(subLangs[0]);
  }

  private isSubTagValid(subTag: string): boolean {
    const languages = window.AccessibilityUtils.languages;
    return languages.hasOwnProperty(subTag);
  }
}

export = QW_ACT_R5;
