import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
//import { QWElement } from '@qualweb/qw-element';
import { WCAGTechniqueClass, ElementExists } from '../lib/decorators';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T11 extends Technique {
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
      test.description = `The applet element does not contain an alt attribute`;
      test.resultCode = 'RC1';
    } else if (alt?.trim() === '') {
      // fails if the element's alt attribute is empty
      test.verdict = 'failed';
      test.description = `The applet element has an empty alt attribute`;
      test.resultCode = 'RC2';
    } else {
      const text = element.getElementText();

      if (text?.trim() !== '') {
        // the element contains a non empty alt attribute and a text in his body
        test.verdict = 'warning';
        test.description = `Please verify that the values of the alt attribute and the body text correctly describe the applet element`;
        test.resultCode = 'RC3';
      } else {
        // fails if the element doesn't contain a text in the body
        test.verdict = 'failed';
        test.description = `The applet element does not contain alternative text in its body`;
        test.resultCode = 'RC4';
      }
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_WCAG_T11;
