import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
//import { QWElement } from '@qualweb/qw-element';
import { WCAGTechniqueClass, ElementExists } from '../lib/decorators';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T5 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const alt = element.getElementAttribute('alt');

    if (alt === null) {
      test.verdict = 'failed';
      test.description = 'The input element does not have an alt attribute';
      test.resultCode = 'RC1';
    } else if (!alt.trim().length) {
      test.verdict = 'failed';
      test.description = 'The input element has an empty alt attribute';
      test.resultCode = 'RC2';
    } else {
      test.verdict = 'warning';
      test.description =
        'Please verify that the value of the alt attribute correctly describes the function of the button';
      test.resultCode = 'RC3';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_WCAG_T5;
