import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T1 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const alt = element.getElementAttribute('alt');

    if (alt === null) {
      // fails if the element doesn't contain an alt attribute
      test.verdict = 'failed';
      test.description = `The test target does not contain an alt attribute`;
      test.resultCode = 'RC1';
    } else if (alt.trim() === '') {
      // fails if the element's alt attribute value is empty
      test.verdict = 'failed';
      test.description = `The test target contains an empty alt attribute`;
      test.resultCode = 'RC2';
    } else {
      // the element contains an non-empty alt attribute, and it's value needs to be verified
      test.verdict = 'warning';
      test.description = 'Please verify that the alt attribute describes correctly the corresponding area of the image';
      test.resultCode = 'RC3';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_WCAG_T1;
