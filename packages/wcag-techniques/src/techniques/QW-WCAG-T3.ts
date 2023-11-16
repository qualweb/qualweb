import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@WCAGTechniqueClass
class QW_WCAG_T3 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
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
      test.resultCode = 'F1';
    } else if (!hasChild || (childText && childText.trim() === '')) {
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

export = QW_WCAG_T3;
