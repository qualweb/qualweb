import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@WCAGTechniqueClass
class QW_WCAG_T13 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
  }

  execute(element: typeof window.qwElement | undefined): void {
    const test = new Test();

    if (element) {
      test.verdict = 'failed';
      test.resultCode = 'F1';
      test.addElement(element);
    } else {
      // success if refresh element doesn't exist
      test.verdict = 'passed';
      test.resultCode = 'P1';
    }

    super.addTestResult(test);
  }
}

export = QW_WCAG_T13;
