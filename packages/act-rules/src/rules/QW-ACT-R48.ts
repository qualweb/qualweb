import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R48 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const isInAT = window.AccessibilityUtils.isElementInAT(element);
    if (isInAT) {
      test.verdict = 'failed';
      test.description = 'The test target is in the accessibility Tree';
      test.resultCode = 'RC1';
    } else {
      test.verdict = 'passed';
      test.description = `The test target is not in the accessibility Tree.`;
      test.resultCode = 'RC2';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_ACT_R48;
