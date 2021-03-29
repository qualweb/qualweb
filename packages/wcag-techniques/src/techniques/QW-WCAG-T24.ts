import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T24 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const isFocusable = window.AccessibilityUtils.isElementFocusable(element);

    if (isFocusable) {
      const keepsFocus = window.AccessibilityUtils.isFocusableBrowser(element);
      if (keepsFocus) {
        test.verdict = 'passed';
        test.description = `Element kept focus`;
        test.resultCode = 'RC1';
      } else {
        test.verdict = 'failed';
        test.description = `Element didn't keep focus`;
        test.resultCode = 'RC2';
      }

      test.addElement(element);
      super.addTestResult(test);
    }
  }
}

export = QW_WCAG_T24;
