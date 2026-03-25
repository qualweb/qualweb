import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, IsInMainContext } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP28 extends BestPractice {
  @ElementExists
  @IsInMainContext
  execute(element: QWElement): void {
    let verdict;
    let resultCode;

    const candidates = element.getElements('h1, [role="heading"][aria-level="1"]');
      const accessibleH1s = candidates.filter(h1 => {
        const hasText = h1.getElementText().trim().length > 0;
        const rect = h1.getBoundingBox();
        const hasSize = rect.width > 0 && rect.height > 0;
        
      if (!hasText || !hasSize || h1.isOffScreen()) {
        return false;
      }
      // Check if the element is hidden by any ancestor
      let parent = h1.getElementParent();
      while (parent) {
        const propertyDisplay = parent.getElementStyleProperty('display', null);
        const propertyAriaHidden = parent.getElementAttribute('aria-hidden') === 'true';
        const propertyOverflow = parent.getElementStyleProperty('overflow', null);
        const boxDimensions = parent.getBoundingBox();

        if (propertyDisplay === 'none' || propertyAriaHidden) {
          return false;
        }

        if ((boxDimensions.height <= 0 || boxDimensions.width <= 0) && propertyOverflow === 'hidden') {
          return false;
        }
        parent = parent.getElementParent();
      }
      return true;
    });
    const count = accessibleH1s.length;
    if (count === 1) {
      verdict = Verdict.PASSED;
      resultCode = 'P1';
    } else if (count === 0) {
      verdict = Verdict.FAILED;
      resultCode = 'F1';
      const test = new Test();
      test.verdict = verdict;
      test.resultCode = resultCode;
      this.addTestResult(test);
    } else {
      verdict = Verdict.FAILED;
      resultCode = 'F2';
    } 
    accessibleH1s.forEach((element) => {
      const test = new Test();
      test.verdict = verdict;
      test.resultCode = resultCode;
      test.addElement(element)
      this.addTestResult(test);
    });
  }
}

export { QW_BP28 };
