import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@BestPracticeClass
class QW_BP1 extends BestPracticeObject {
  constructor(bestPractice: BestPractice, locale: Translate) {
    super(bestPractice, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const headings = element.getElements('h1, h2, h3, h4, h5, h6, [role="heading"]');

    for (const heading of headings ?? []) {
      if (window.AccessibilityUtils.isElementInAT(heading) || window.DomUtils.isElementVisible(heading)) {
        const test = new Test('warning', undefined, 'W1');
        test.addElement(heading);
        super.addTestResult(test);
      }
    }

    if (super.getNumberOfWarningResults() === 0) {
      const test = new Test('failed', undefined, 'F1');
      super.addTestResult(test);
    }
  }
}

export = QW_BP1;
