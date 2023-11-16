import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists, ElementHasVisibleChild } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@BestPracticeClass
class QW_BP8 extends BestPracticeObject {
  constructor(bestPractice: BestPractice, locale: Translate) {
    super(bestPractice, locale);
  }

  @ElementExists
  @ElementHasVisibleChild('img, svg')
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const descendants = element.getElements('*');

    const images = element.getElements('img');
    const svgs = element.getElements('svg');

    let hasMoreElements = false;
    if (descendants.length > images.length + svgs.length) {
      hasMoreElements = this.checkApplicability(element);
    }

    if (!hasMoreElements) {
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

      test.addElement(element, true, true);
      super.addTestResult(test);
    }
  }

  checkApplicability(element: typeof window.qwElement): boolean {
    let hasMoreElements = false;
    for (const child of element.getElementChildren() ?? []) {
      const tagName = child.getElementTagName();
      if (tagName !== 'img' && tagName !== 'svg') {
        const text = child.getElementText();
        const isVisible = window.DomUtils.isElementVisible(child);
        const accessibleName = window.AccessibilityUtils.getAccessibleName(child);

        if (isVisible && (text.trim() !== '' || (accessibleName && !this.checkApplicability(child)))) {
          hasMoreElements = true;
        }
      }
    }

    return hasMoreElements;
  }
}

export = QW_BP8;
