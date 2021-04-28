import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, ElementIsInAccessibilityTree, IsHTMLDocument } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R6 extends AtomicRule {
  constructor(rule: ACTRule, locale: any) {
    super(rule, locale);
  }

  @ElementExists
  @IsHTMLDocument
  @ElementIsInAccessibilityTree
  execute(element: typeof window.qwElement): void {
    const accessibleName = window.AccessibilityUtils.getAccessibleName(element);

    const test = new Test();
    
    if (accessibleName?.trim()) {
      test.verdict = 'passed';
      test.description = `The \`image button\` has an accessible name.`;
      test.resultCode = 'RC1';
    } else {
      test.verdict = 'failed';
      test.description = `The \`image button\` doesn't have an accessible name.`;
      test.resultCode = 'RC2';
    }

    test.addElement(element, true, false, true);
    super.addTestResult(test);
  }
}

export = QW_ACT_R6;
