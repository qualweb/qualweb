import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R13 extends AtomicRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const children = element.getElementChildren();
    if (children.length > 0) {
      const focusable = this.isFocusableChildren(element);
      if (focusable) {
        test.verdict = 'failed';
        test.resultCode = 'F1';
      } else {
        test.verdict = 'passed';
        test.resultCode = 'P1';
      }
    } else {
      const focusable = window.AccessibilityUtils.isPartOfSequentialFocusNavigation(element);
      if (focusable) {
        test.verdict = 'failed';
        test.resultCode = 'F2';
      } else {
        test.verdict = 'passed';
        test.resultCode = 'P2';
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
        this.triggerFocus(child);
        const newFocusedElement = window.qwPage.getFocusedElement();
        if (child.getElementSelector() === newFocusedElement?.getElementSelector()) {
          result = true;
        }
      } else {
        const childFocusable = this.isFocusableChildren(child);
        result = result || childFocusable;
      }
    }
    return result;
  }

  private triggerFocus(element: typeof window.qwElement) {
    const event = new Event("focus", { bubbles: false, cancelable: true });
    element.focusElement();
    element.dispatchEvent(event);
}

}

export = QW_ACT_R13;
