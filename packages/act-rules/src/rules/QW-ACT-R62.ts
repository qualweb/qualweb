import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R62 extends AtomicRule {
  @ElementExists
  execute(element: QWElement): void {
    const elementList = element.getElements('*');
    const inSequentialFocusList = elementList.filter((element) => {
      return window.AccessibilityUtils.isPartOfSequentialFocusNavigation(element);
    });

    if (inSequentialFocusList.length >= 1) {
      for (const inSequentialFocusElement of inSequentialFocusList ?? []) {
        const test = new Test(Verdict.WARNING, undefined, 'W1');
        test.addElement(inSequentialFocusElement);
        this.addTestResult(test);
      }
    }
  }
}

export { QW_ACT_R62 };
