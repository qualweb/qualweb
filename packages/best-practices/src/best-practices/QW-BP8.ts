import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists, ElementHasChild } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@BestPracticeClass
class QW_BP8 extends BestPracticeObject {
  constructor(bestPractice: BestPractice, locale: Translate) {
    super(bestPractice, locale);
  }

  @ElementExists
  @ElementHasChild('img, svg')
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const images = element.getElements('img');
    const svgs = element.getElements('svg');

    if (images.length + svgs.length !== 0) {
      const svgANames = new Array<string>();

      for (const svg of svgs || []) {
        const aName = window.AccessibilityUtils.getAccessibleNameSVG(svg);
        if (aName && aName.trim() !== '') {
          svgANames.push(aName);
        }
      }

      const aName = window.AccessibilityUtils.getAccessibleName(element);
      if ((aName && aName.trim() !== '') || svgANames.length > 0) {
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
}

export = QW_BP8;
