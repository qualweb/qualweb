import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T25 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const name = element.getElementTagName();

    const hasScope = element.elementHasAttribute('scope');
    const scope = element.getElementAttribute('scope');

    if (name === 'th' && !hasScope) {
      test.verdict = 'failed';
      test.description = `The element doesn't contain a scope attribute`;
      test.resultCode = 'RC1';
    } else if (name === 'th' && scope === '') {
      test.verdict = 'failed';
      test.description = `The element's scope attribute is empty`;
      test.resultCode = 'RC2';
    } else if (scope && ['col', 'row', 'colgroup', 'rowgroup'].includes(scope)) {
      test.verdict = 'passed';
      test.description = "The element's scope attribute matches the following values: col, row, colgroup, rowgroup";
      test.resultCode = 'RC3';
    } else {
      test.verdict = 'failed';
      test.description =
        "The element's scope attribute doesn't match any of the following values: col, row, colgroup, rowgroup";
      test.resultCode = 'RC4';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_WCAG_T25;
