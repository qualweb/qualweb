import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { WCAGTechniqueClass, ElementExists } from '../lib/decorators';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T2 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const hasChild = element.elementHasChild('caption');
    const childText = element.getElementChildTextContent('caption');

    if (!hasChild) {
      test.verdict = 'failed';
      test.description = 'The caption does not exist in the table element';
      test.resultCode = 'RC1';
    } else if (!childText || (childText && childText.trim() === '')) {
      test.verdict = 'failed';
      test.description = 'The caption is empty';
      test.resultCode = 'RC2';
    } else {
      test.verdict = 'warning';
      test.description = 'Please verify that the caption element identifies the table correctly.';
      test.resultCode = 'RC3';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_WCAG_T2;
