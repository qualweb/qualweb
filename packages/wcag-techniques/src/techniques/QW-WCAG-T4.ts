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
      test.description = 'The summary is empty';
      test.resultCode = 'RC2';
    } else if (summary.trim() === caption?.trim()) {
      test.verdict = 'failed';
      test.description = 'The caption is a duplicate of the summary';
      test.resultCode = 'RC3';
    } else {
      test.verdict = 'warning';
      test.description = 'Please verify that the summary is a valid description of the table';
      test.resultCode = 'RC4';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_WCAG_T4;
