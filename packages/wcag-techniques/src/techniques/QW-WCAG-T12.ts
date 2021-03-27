import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
//import { QWElement } from '@qualweb/qw-element';
import { WCAGTechniqueClass, ElementExists } from '../lib/decorators';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T12 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const checks: { [key: string]: boolean } = {};
    checks['hasCaption'] = false;
    checks['hasTh'] = false;

    if (element.elementHasChildren()) {
      checks['hasCaption'] = !!element.getElement('caption');
      checks['hasTh'] = !!element.getElement('th');
    }

    const summary = element.getElementAttribute('summary');

    if (summary?.trim() !== '') {
      test.verdict = 'failed';
      test.description = `The table has a non-empty summary - Amend it if it's a layout table`;
      test.resultCode = 'RC1';
    } else if (checks['hasTh']) {
      test.verdict = 'failed';
      test.description = `The table has a th element - Amend it if it's a layout table`;
      test.resultCode = 'RC2';
    } else if (checks['hasCaption']) {
      test.verdict = 'failed';
      test.description = `The table has a caption element - Amend it if it's a layout table`;
      test.resultCode = 'RC3';
    } else {
      test.verdict = 'warning';
      test.description = `No incorrect elements used in layout table`;
      test.resultCode = 'RC4';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_WCAG_T12;
