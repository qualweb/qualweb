import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@WCAGTechniqueClass
class QW_WCAG_T11 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const alt = element.getElementAttribute('alt');

    if (alt === null) {
      // fails if the element doesn't contain an alt attribute
      test.verdict = 'failed';
      test.resultCode = 'F1';
    } else if (alt?.trim() === '') {
      // fails if the element's alt attribute is empty
      test.verdict = 'failed';
      test.resultCode = 'F2';
    } else {
      const text = element.getElementText();

      if (text?.trim() !== '') {
        // the element contains a non empty alt attribute and a text in his body
        test.verdict = 'warning';
        test.resultCode = 'W1';
      } else {
        // fails if the element doesn't contain a text in the body
        test.verdict = 'failed';
        test.resultCode = 'F3';
      }
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_WCAG_T11;
