import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@WCAGTechniqueClass
class QW_WCAG_T19 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const children = element.getElements(`input[type="submit"], input[type="image"], button[type="submit"]`);

    if (children.length > 0) {
      // the element contains one of the following elements input[type~='submit image'], button[type='submit']
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else {
      // fails if none of the following elements was found input[type~='submit image'], button[type='submit']
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_WCAG_T19;
