import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import {
  WCAGTechniqueClass,
  ElementExists,
  ElementHasAttributes,
  ElementIsInAccessibilityTree
} from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@WCAGTechniqueClass
class QW_WCAG_T21 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
  }

  @ElementExists
  @ElementHasAttributes
  @ElementIsInAccessibilityTree
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const img = element.getElement('img');
    const aText = element.getElementText();

    if (!((aText !== undefined && aText.trim() !== '') || !img)) {
      if (window.AccessibilityUtils.getAccessibleName(element)) {
        test.verdict = 'passed';
        test.resultCode = 'P1';
      } else {
        test.verdict = 'failed';
        test.resultCode = 'F1';
      }

      test.addElement(element);
      super.addTestResult(test);
    }
  }
}

export = QW_WCAG_T21;
