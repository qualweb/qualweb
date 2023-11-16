import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@WCAGTechniqueClass
class QW_WCAG_T2 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const hasChild = element.elementHasChild('caption');
    const childText = element.getElementChildTextContent('caption');

    if (!hasChild || (childText && childText.trim() === '')) {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    } else {
      test.verdict = 'warning';
      test.resultCode = 'W1';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_WCAG_T2;
