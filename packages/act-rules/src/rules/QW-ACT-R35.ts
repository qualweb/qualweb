import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import {
  ACTRuleDecorator,
  ElementExists,
  ElementHasOneOfTheFollowingRoles,
  ElementIsInAccessibilityTree
} from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R35 extends AtomicRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
  }

  @ElementExists
  @ElementHasOneOfTheFollowingRoles(['heading'])
  @ElementIsInAccessibilityTree
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const accessibleName = window.AccessibilityUtils.getAccessibleName(element);
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

export = QW_ACT_R35;
