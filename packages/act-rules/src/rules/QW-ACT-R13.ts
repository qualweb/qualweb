import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R13 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const children = element.getElementChildren();
    if (children && children.length > 0) {
      const focusable = this.isFocusableChildren(element);
      if (focusable) {
        test.verdict = 'failed';
        test.description = `The test target has focusable children.`;
        test.resultCode = 'RC1';
      } else {
        test.verdict = 'passed';
        test.description = `The test target children are unfocusable.`;
        test.resultCode = 'RC2';
      }
    } else {
      const focusable = window.AccessibilityUtils.isPartOfSequentialFocusNavigation(element);
      if (focusable) {
        test.verdict = 'failed';
        test.description = `Thie test target is focusable.`;
        test.resultCode = 'RC3';
      } else {
        test.verdict = 'passed';
        test.description = `The test target is unfocusable.`;
        test.resultCode = 'RC4';
      }
    }

    test.addElement(element);
    super.addTestResult(test);
  }

  private isFocusableChildren(element: typeof window.qwElement): boolean {
    let result = window.AccessibilityUtils.isPartOfSequentialFocusNavigation(element);
    const children = element.getElementChildren();
    for (const child of children || []) {
      const focusable = window.AccessibilityUtils.isPartOfSequentialFocusNavigation(child);
      if (focusable) {
        result = true;
      } else {
        const childFocusable = this.isFocusableChildren(child);
        result = result || childFocusable;
      }
    }
    return result;
  }
}

export = QW_ACT_R13;
