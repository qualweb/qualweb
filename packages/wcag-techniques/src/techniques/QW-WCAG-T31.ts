import type { QWElement } from '@packages/qw-element/src';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Verdict } from '@shared/types';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T31 extends Technique {
  @ElementExists
  execute(element: QWElement): void {
    if (
      element.getElementTagName() === 'head' ||
      element.getElementParent()?.getElementTagName() === 'head' ||
      !element.hasTextNode()
    ) {
      return;
    }

    const test = new Test();

    let foundColorProperty = false;
    let foundBackgroundProperty = false;

    let parent: QWElement | null = element;
    while (parent !== null) {
      const hasColor = parent.hasCSSProperty('color');
      const hasBackgroundColor = parent.hasCSSProperty('background-color');
      const hasBackgroundImage = parent.hasCSSProperty('background-image');
      const hasBackground = parent.hasCSSProperty('background');

      if (hasColor && !foundColorProperty) {
        foundColorProperty = true;
      }

      if ((hasBackground || hasBackgroundColor || hasBackgroundImage) && !foundBackgroundProperty) {
        foundBackgroundProperty = true;
      }

      if (foundColorProperty && foundBackgroundProperty) {
        parent = null;
      } else {
        parent = parent.getElementParent();
      }
    }

    if (foundColorProperty && foundBackgroundProperty) {
      test.verdict = Verdict.PASSED;
      test.resultCode = 'P1';

      test.addElement(element);
      this.addTestResult(test);
    } else if (foundColorProperty) {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F1';

      test.addElement(element);
      this.addTestResult(test);
    } else if (foundBackgroundProperty) {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F2';

      test.addElement(element);
      this.addTestResult(test);
    }
  }
}

export { QW_WCAG_T31 };
