import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
//import { QWElement } from '@qualweb/qw-element';
import { WCAGTechniqueClass, ElementExists } from '../lib/decorators';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T19 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const children = element.getElements(`input[type="submit"], input[type="image"], button[type="submit"]`);

    if (children.length > 0) {
      // the element contains one of the following elements input[type~='submit image'], button[type='submit']
      test.verdict = 'passed';
      test.description = `The form contains one of the following elements input[type~="submit image"], button[type="submit"]`;
      test.resultCode = 'RC1';
    } else {
      // fails if none of the following elements was found input[type~='submit image'], button[type='submit']
      test.verdict = 'failed';
      test.description = `Form tag doesn't contain any of the following elements input[type~="submit image"], button[type="submit"]`;
      test.resultCode = 'RC2';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_WCAG_T19;
