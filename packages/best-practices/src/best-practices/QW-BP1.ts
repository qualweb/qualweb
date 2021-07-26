import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';

@BestPracticeClass
class QW_BP1 extends BestPracticeObject {
  constructor(bestPractice: BestPractice) {
    super(bestPractice);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const headings = element.getElements('h1, h2, h3, h4, h5, h6, [role="heading"]');

    for (const heading of headings ?? []) {
      const test = new Test();
      
      if (window.AccessibilityUtils.isElementInAT(heading) || window.DomUtils.isElementVisible(heading)) {
        test.verdict = 'warning';
        test.description = 'Check that heading markup is used when content is a heading.';
        test.resultCode = 'RC1';

        test.addElement(heading);
        super.addTestResult(test);
      }
    }

    if (super.getNumberOfWarningResults() === 0) {
      const test = new Test();
      test.verdict = 'failed';
      test.description = `This page doesn't use headings.`;
      test.resultCode = 'RC2';
      super.addTestResult(test);
    }
  }
}

export = QW_BP1;
