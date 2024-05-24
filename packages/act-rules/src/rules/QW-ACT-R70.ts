import type { QWElement } from '@packages/qw-element/src';
import { ElementExists, ElementIsNotInert, ElementIsVisible } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Verdict } from '@shared/types';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R70 extends AtomicRule {
  @ElementExists
  @ElementIsNotInert
  @ElementIsVisible
  execute(element: QWElement): void {
    const test = new Test();

    const elementList = window.qwPage.getElements('*', undefined);
    const childrenInSequentialFocusList = elementList.filter((elem) => {
      return (
        window.AccessibilityUtils.isPartOfSequentialFocusNavigation(elem) && window.DomUtils.isElementVisible(elem)
      );
    });
    if (childrenInSequentialFocusList.length === 0) {
      test.verdict = Verdict.INAPPLICABLE;
      test.resultCode = 'I1';
      test.addElement(element);
    } else {
      const tabindex = (<QWElement>arguments[0]).getElementAttribute('tabindex');
      if (tabindex && parseInt(tabindex) <= -1) {
        test.verdict = Verdict.FAILED;
        test.resultCode = 'F1';
        test.addElement(element, false);
      } else {
        test.verdict = Verdict.PASSED;
        test.resultCode = 'P1';
        test.addElement(element);
      }
    }

    this.addTestResult(test);
  }
}

export { QW_ACT_R70 };
