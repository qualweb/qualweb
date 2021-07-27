import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@WCAGTechniqueClass
class QW_WCAG_T32 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const hasLi = element.getElements('li').length !== 0;
    const hasDd = element.getElements('dd').length !== 0;
    const hasDt = element.getElements('dt').length !== 0;

    const name = element.getElementTagName();

    if (hasLi && name === 'ul') {
      // fails if the element doesn't contain an alt attribute
      test.verdict = 'warning';
      test.resultCode = 'W1';
    } else if (hasLi && name === 'ol') {
      test.verdict = 'warning';
      test.resultCode = 'W2';
    } else if (name === 'dl' && (hasDt || hasDd)) {
      test.verdict = 'warning';
      test.resultCode = 'W3';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }

    test.addElement(element, true, true);
    super.addTestResult(test);
  }
}

export = QW_WCAG_T32;
