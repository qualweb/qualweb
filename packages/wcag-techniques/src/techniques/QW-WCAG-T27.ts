import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T27 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const alignAttribute = element.getElementStyleProperty('text-align', null);

    if (alignAttribute) {
      if (alignAttribute.includes('justify')) {
        test.verdict = 'failed';
        test.description = "This content shouldn't be justified";
        test.resultCode = 'RC1';
      } else {
        test.verdict = 'passed';
        test.description = 'This content is not justified';
        test.resultCode = 'RC2';
      }

      test.addElement(element);
      super.addTestResult(test);
    }
  }
}

export = QW_WCAG_T27;
