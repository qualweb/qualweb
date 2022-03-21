import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@BestPracticeClass
class QW_BP23 extends BestPracticeObject {
  constructor(bestPractice: BestPractice, locale: Translate) {
    super(bestPractice, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();
    const parent = element.getElementParent();
    let isValidParent = false;
    if (parent) {
      const parentRole = window.AccessibilityUtils.getElementRole(parent);
      if (parentRole && ['presentation', 'none', 'list'].includes(parentRole)) {
        isValidParent = true;
      }
    }

    if (isValidParent) {
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

export = QW_BP23;
