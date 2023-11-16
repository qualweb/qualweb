import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists, ElementIsDataTable, ElementHasAttribute } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@WCAGTechniqueClass
class QW_WCAG_T4 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
  }

  @ElementExists
  @ElementIsDataTable
  @ElementHasAttribute('summary')
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const caption = element.getElementChildTextContent('caption');
    const summary = <string>element.getElementAttribute('summary');

    if (!summary.trim().length) {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    } else if (summary.trim() === caption?.trim()) {
      test.verdict = 'failed';
      test.resultCode = 'F2';
    } else {
      test.verdict = 'warning';
      test.resultCode = 'W1';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_WCAG_T4;
