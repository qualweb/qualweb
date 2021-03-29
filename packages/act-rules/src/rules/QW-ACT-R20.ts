import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R20 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const roleAttr = element.getElementAttribute('role');

    if (roleAttr && roleAttr.trim().length > 0) {
      const isHidden = window.DomUtils.isElementHidden(element);
      if (!isHidden) {
        if (window.AccessibilityUtils.elementHasValidRole(element)) {
          test.verdict = 'passed';
          test.description = `The test target has a valid \`role\` attribute.`;
          test.resultCode = 'RC1';
        } else {
          test.verdict = 'failed';
          test.description = `The test target has an invalid \`role\` attribute.`;
          test.resultCode = 'RC2';
        }

        test.addElement(element);
        super.addTestResult(test);
      }
    }
  }
}

export = QW_ACT_R20;
