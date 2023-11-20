import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@WCAGTechniqueClass
class QW_WCAG_T25 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const name = element.getElementTagName();

    const hasScope = element.elementHasAttribute('scope');
    const scope = element.getElementAttribute('scope');

    if (name === 'th' && !hasScope) {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    } else if (name === 'th' && scope === '') {
      test.verdict = 'failed';
      test.resultCode = 'F2';
    } else if (scope && ['col', 'row', 'colgroup', 'rowgroup'].includes(scope)) {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F3';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_WCAG_T25;
