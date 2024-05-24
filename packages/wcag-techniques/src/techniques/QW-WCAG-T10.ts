import type { QWElement } from '@packages/qw-element/src';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Verdict } from '@shared/types';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T10 extends Technique {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const images = element.getElements('img');
    const text = element.getElementText();

    const hasImage = images.length > 0;
    let hasNonEmptyAlt = false;
    let hasAlt = false;
    let equalAltText = false;

    for (const img of images || []) {
      // fails if the element doesn't contain an alt attribute
      if (img.elementHasAttribute('alt') && !hasNonEmptyAlt && !equalAltText) {
        hasAlt = true;
        const alt = img.getElementAttribute('alt');
        if (alt !== null) {
          hasNonEmptyAlt = alt.trim() !== '';
          equalAltText = !!text && alt.trim() === text.trim();
        }
      }
    }

    if (!hasImage || !hasAlt || !text || text.trim() === '') {
      //inapplicable
      return;
    } else if (!hasNonEmptyAlt) {
      test.verdict = Verdict.PASSED;
      test.resultCode = 'P1';
    } else if (equalAltText) {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F1';
    } else {
      test.verdict = Verdict.WARNING;
      test.resultCode = 'W1';
    }

    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_WCAG_T10 };
