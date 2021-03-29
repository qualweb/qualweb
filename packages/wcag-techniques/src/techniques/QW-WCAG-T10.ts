import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T10 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
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
      test.description = `The a element contains an image that has an empty alt attribute`;
      test.resultCode = 'RC1';
    } else if (equalAltText) {
      test.verdict = 'failed';
      test.description = `The link text is equal to the image's alternative text`;
      test.resultCode = 'RC2';
    } else {
      test.verdict = 'warning';
      test.description = 'The link contains an image that has an alt attribute that should be manually verified';
      test.resultCode = 'RC3';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_WCAG_T10;
