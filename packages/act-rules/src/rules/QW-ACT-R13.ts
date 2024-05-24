import type { QWElement } from '@packages/qw-element/src';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Verdict } from '@shared/types';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R13 extends AtomicRule {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const children = element.getElementChildren();
    if (children.length > 0) {
      const focusable = this.isFocusableChildren(element);
      if (focusable) {
        test.verdict = Verdict.FAILED;
        test.resultCode = 'F1';
      } else {
        test.verdict = Verdict.PASSED;
        test.resultCode = 'P1';
      }
    } else {
      const focusable = window.AccessibilityUtils.isPartOfSequentialFocusNavigation(element);
      if (focusable) {
        test.verdict = Verdict.FAILED;
        test.resultCode = 'F2';
      } else {
        test.verdict = Verdict.PASSED;
        test.resultCode = 'P2';
      }
    }

    test.addElement(element);
    this.addTestResult(test);
  }

  private isFocusableChildren(element: QWElement): boolean {
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

  private triggerFocus(element: QWElement) {
    const event = new Event('focus', { bubbles: false, cancelable: true });
    element.focusElement();
    element.dispatchEvent(event);
  }
}

export { QW_ACT_R13 };
