import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R19 extends AtomicRule {
  constructor(rule: ACTRule, locale: any) {
    super(rule, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const tabIndex = element.getElementAttribute('tabindex');
    const isInAT = window.AccessibilityUtils.isElementInAT(element);

    if (isInAT && (!tabIndex || parseInt(tabIndex) >= 0)) {
      const test = new Test();

      const accessibleName = window.AccessibilityUtils.getAccessibleName(element);
      if (accessibleName && accessibleName.trim() !== '') {
        test.verdict = 'passed';
        test.resultCode = 'RC1';
      } else {
        test.verdict = 'failed';
        test.resultCode = 'RC2';
      }

      test.addElement(element, true, false, true);
      super.addTestResult(test);
    }
  }
}
export = QW_ACT_R19;
