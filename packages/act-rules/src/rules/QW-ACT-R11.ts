import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
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
  constructor(rule: ACTRule, locale: Translate) {
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
      test.resultCode = 'P1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }

    test.addElement(element, true, true, true);
    super.addTestResult(test);
  }
}

export = QW_ACT_R11;
