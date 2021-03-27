import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
//import { QWElement } from '@qualweb/qw-element';
import { WCAGTechniqueClass, ElementExists } from '../lib/decorators';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T7 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const title = element.getElementAttribute('title');

    if (title?.trim() !== '') {
      test.verdict = 'passed';
      test.description = `The test target has the definition in the title attribute`;
      test.resultCode = 'RC1';
    } else {
      test.verdict = 'failed';
      test.description = `The test target doesn't have the definition in the title attribute`;
      test.resultCode = 'RC2';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_WCAG_T7;
