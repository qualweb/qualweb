import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists, ElementHasChild } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@BestPracticeClass
class QW_BP19 extends BestPracticeObject {
  constructor(bestPractice: BestPractice, locale: Translate) {
    super(bestPractice, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const isTopLevel = this.landmarkIsTopLevelEvaluate(element);

    if (isTopLevel) {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }
    test.addElement(element);
    super.addTestResult(test);
  }

  private landmarkIsTopLevelEvaluate(element: typeof window.qwElement) {
    const landmarks = ['application', 'banner', 'contentinfo', 'main', 'complementary', 'form', 'navigation', 'region'];
    let parent = element.getElementParent();
    const nodeRole = window.AccessibilityUtils.getElementRole(element);

    while (parent) {
      const role = window.AccessibilityUtils.getElementRole(parent);
      if (role && landmarks.includes(role) && !(role === 'main' && nodeRole === 'complementary')) {
        return false;
      }
      parent = parent.getElementParent();
    }
    return true;
  }
}

export = QW_BP19;
