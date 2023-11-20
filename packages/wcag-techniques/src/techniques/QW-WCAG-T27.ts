import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@WCAGTechniqueClass
class QW_WCAG_T27 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const alignAttribute = element.getElementAttribute('align');

    if (alignAttribute) {
      if (alignAttribute.trim().toLowerCase() === 'justify') {
        test.verdict = 'failed';
        test.resultCode = 'F1';
      } else {
        test.verdict = 'passed';
        test.resultCode = 'P1';
      }

      test.addElement(element);
      super.addTestResult(test);
    }
  }
}

export = QW_WCAG_T27;
