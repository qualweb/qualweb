import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass } from '../lib/applicability';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T13 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  execute(element: typeof window.qwElement | undefined): void {
    const test = new Test();

    if (element) {
      test.verdict = 'failed';
      test.description = 'Used blink element';
      test.resultCode = 'RC1';
      test.addElement(element);
    } else {
      // success if refresh element doesn't exist
      test.verdict = 'passed';
      test.description = `Blink is not used`;
      test.resultCode = 'RC2';
    }

    super.addTestResult(test);
  }
}

export = QW_WCAG_T13;
