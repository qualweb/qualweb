import Technique from '../lib/Technique.object';
import { WCAGTechnique } from '@qualweb/wcag-techniques';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@WCAGTechniqueClass
class QW_WCAG_T31 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
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

    let parent: typeof window.qwElement | null = element;
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
      super.addTestResult(test);
    } else if (foundColorProperty) {
      test.verdict = 'failed';
      test.resultCode = 'F1';

      test.addElement(element);
      super.addTestResult(test);
    } else if (foundBackgroundProperty) {
      test.verdict = 'failed';
      test.resultCode = 'F2';

      test.addElement(element);
      super.addTestResult(test);
    }
  }
}

export = QW_WCAG_T31;
