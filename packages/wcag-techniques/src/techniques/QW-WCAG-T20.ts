import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists, ElementHasAttribute } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@WCAGTechniqueClass
class QW_WCAG_T20 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
  }

  @ElementExists
  @ElementHasAttribute('title')
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const title = (<string>element.getElementAttribute('title')).trim();
    const text = element.getElementText().trim();

    if (!title) {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    } else if (title === text) {
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

export = QW_WCAG_T20;
