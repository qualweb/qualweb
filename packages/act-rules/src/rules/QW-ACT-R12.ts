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
class QW_ACT_R12 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  @ElementIsInAccessibilityTree
  @ElementHasAttributeRole('link')
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const accessibleName = window.AccessibilityUtils.getAccessibleName(element);

    if (accessibleName && accessibleName.trim() !== '') {
      test.verdict = 'passed';
      test.description = `The test target has a valid accessible name.`;
      test.resultCode = 'RC1';
    } else {
      test.verdict = 'failed';
      test.description = `The test target doesn't have an accessible name, or it's empty ("").`;
      test.resultCode = 'RC2';
    }

    test.addElement(element, true, false, true);
    super.addTestResult(test);
  }
}

export = QW_ACT_R12;
