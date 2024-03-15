import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementIsNotInert, ElementIsVisible, Test } from '@qualweb/lib';
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
      test.verdict = 'inapplicable';
      test.resultCode = 'I1';
      test.addElement(element);
    } else {
      const tabindex = (<QWElement>arguments[0]).getElementAttribute('tabindex');
      if (tabindex && parseInt(tabindex) <= -1) {
        test.verdict = 'failed';
        test.resultCode = 'F1';
        test.addElement(element, false);
      } else {
        test.verdict = 'passed';
        test.resultCode = 'P1';
        test.addElement(element);
      }
    }

    this.addTestResult(test);
  }
}

export { QW_ACT_R70 };
