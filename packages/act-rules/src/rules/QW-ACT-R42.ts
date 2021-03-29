import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R42 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const isInAT = window.AccessibilityUtils.isElementInAT(element);
    const isNonText = window.DomUtils.objectElementIsNonText(element);
    if (isInAT && isNonText) {
      const accessibleName = window.AccessibilityUtils.getAccessibleName(element);
      if (accessibleName) {
        test.verdict = 'passed';
        test.description = 'The test target has a non-empty accessible name.';
        test.resultCode = 'RC1';
      } else {
        test.verdict = 'failed';
        test.description = `The test target accessible name doesn't exist or it's empty ("").`;
        test.resultCode = 'RC2';
      }

      test.addElement(element, true, false, true);
      super.addTestResult(test);
    }
  }
}

export = QW_ACT_R42;
