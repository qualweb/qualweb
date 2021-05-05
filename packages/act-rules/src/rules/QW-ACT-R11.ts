import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import {
  ACTRuleDecorator,
  ElementExists,
  ElementIsInAccessibilityTree,
  ElementHasAttributeRole
} from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R11 extends AtomicRule {
  constructor(rule: ACTRule, locale: any) {
    super(rule, locale);
  }

  @ElementExists
  @ElementIsInAccessibilityTree
  @ElementHasAttributeRole('button')
  execute(element: typeof window.qwElement): void {

    const accessibleName = window.AccessibilityUtils.getAccessibleName(element);

    const test = new Test();

    if (accessibleName && accessibleName.trim() !== '') {
      test.verdict = 'passed';
      test.resultCode = 'RC1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'RC2';
    }

    test.addElement(element, true, true, true);
    super.addTestResult(test);
  }
}

export = QW_ACT_R11;
