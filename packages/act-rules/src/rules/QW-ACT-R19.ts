import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R19 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const tabIndex = element.getElementAttribute('tabindex');
    const isInAT = window.AccessibilityUtils.isElementInAT(element);

    if (isInAT && (!tabIndex || parseInt(tabIndex) >= 0)) {
      const test = new Test();

      const accessibleName = window.AccessibilityUtils.getAccessibleName(element);
      if (accessibleName?.trim()) {
        test.verdict = 'passed';
        test.description = `The test target has an accessible name.`;
        test.resultCode = 'RC2';
      } else {
        test.verdict = 'failed';
        test.description = `The test target doesn't have an accessible name.`;
        test.resultCode = 'RC3';
      }

      test.addElement(element, true, false, true);
      super.addTestResult(test);
    }
  }
}
export = QW_ACT_R19;
