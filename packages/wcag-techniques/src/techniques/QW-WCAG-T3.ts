import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T3 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const formATT = element.getElementAttribute('form');

    let validFormAtt = new Array<typeof window.qwElement>();

    if (formATT) {
      validFormAtt = window.qwPage.getElements(`form[id="${formATT}"]`);
    }

    const hasParent = element.elementHasParent('form');
    const hasChild = element.elementHasChild('legend');
    const childText = element.getElementChildTextContent('legend');

    if (!hasParent && validFormAtt.length === 0) {
      test.verdict = 'failed';
      test.description = 'The fieldset is not in a form and is not referencing a form';
      test.resultCode = 'RC1';
    } else if (!hasChild) {
      test.verdict = 'failed';
      test.description = 'The legend does not exist in the fieldset element';
      test.resultCode = 'RC2';
    } else if (childText && childText.trim() === '') {
      test.verdict = 'failed';
      test.description = 'The legend is empty';
      test.resultCode = 'RC3';
    } else {
      test.verdict = 'warning';
      test.description = 'Please verify that the legend description is valid';
      test.resultCode = 'RC4';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_WCAG_T3;
