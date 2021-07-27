import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@WCAGTechniqueClass
class QW_WCAG_T10 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
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
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else if (equalAltText) {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    } else {
      test.verdict = 'warning';
      test.resultCode = 'W1';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_WCAG_T10;
