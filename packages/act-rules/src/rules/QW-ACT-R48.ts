import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R48 extends AtomicRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const isInAT = window.AccessibilityUtils.isElementInAT(element);
    if (!isInAT) {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_ACT_R48;
