import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@WCAGTechniqueClass
class QW_WCAG_T12 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
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

    if (summary && summary.trim() !== '') {
      test.verdict = 'warning';
      test.resultCode = 'W1';
    } else if (checks['hasTh']) {
      test.verdict = 'warning';
      test.resultCode = 'W2';
    } else if (checks['hasCaption']) {
      test.verdict = 'warning';
      test.resultCode = 'W3';
    } else {
      test.verdict = 'warning';
      test.resultCode = 'W4';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_WCAG_T12;
