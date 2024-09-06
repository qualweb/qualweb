import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementHasVisibleChild } from '@qualweb/common';
import { Test } from '@qualweb/common';
import { Verdict } from '@qualweb/common';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP8 extends BestPractice {
  @ElementExists
  @ElementHasVisibleChild('img, svg')
  execute(element: QWElement): void {
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
        test.verdict = Verdict.PASSED;
        test.resultCode = 'P1';
      } else {
        test.verdict = Verdict.FAILED;
        test.resultCode = 'F1';
      }

      test.addElement(element, true, true);
      this.addTestResult(test);
    }
  }

  checkApplicability(element: QWElement): boolean {
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

export { QW_BP8 };
