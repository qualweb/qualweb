import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists, ElementHasChild } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@BestPracticeClass
class QW_BP24 extends BestPracticeObject {
  constructor(bestPractice: BestPractice, locale: Translate) {
    super(bestPractice, locale);
  }

  @ElementExists
  @ElementHasChild('*')
  execute(element: typeof window.qwElement): void {
    const test = new Test();
    const children = element.getElementChildren();
    let allChildrenValid = true;
    children.map((child) => {
      const role = window.AccessibilityUtils.getElementRole(child);
      const name = child.getElementTagName();
      if (name !== 'li' && role !== 'listitem') {
        allChildrenValid = false;
      }
    });

    if (allChildrenValid) {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }
    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_BP24;
