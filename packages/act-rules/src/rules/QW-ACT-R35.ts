import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R35 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const role = window.AccessibilityUtils.getElementRole(element);

    if (role !== 'heading') {
      return;
    }

    const test = new Test();

    const isInAT = window.AccessibilityUtils.isElementInAT(element);
    if (isInAT) {
      const accessibleName = window.AccessibilityUtils.getAccessibleName(element);
      if (!!accessibleName && accessibleName !== undefined) {
        test.verdict = 'passed';
        test.description = 'The test target has a non-empty accessible name.';
        test.resultCode = 'RC1';
      } else {
        test.verdict = 'failed';
        test.description = `The test target accessible name doesn't exist or it's empty ("").`;
        test.resultCode = 'RC2';
      }

      test.addElement(element, true, true, true);
      super.addTestResult(test);
    }
  }
}

export = QW_ACT_R35;
