import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, Test } from '@qualweb/lib';
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
      test.verdict = 'passed';
      test.resultCode = 'P1';

      test.addElement(element);
      this.addTestResult(test);
    } else if (foundColorProperty) {
      test.verdict = 'failed';
      test.resultCode = 'F1';

      test.addElement(element);
      this.addTestResult(test);
    } else if (foundBackgroundProperty) {
      test.verdict = 'failed';
      test.resultCode = 'F2';

      test.addElement(element);
      this.addTestResult(test);
    }
  }
}

export { QW_WCAG_T31 };
