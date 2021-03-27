import { WCAGTechnique } from '@qualweb/wcag-techniques';
//import { AccessibilityUtils } from '@qualweb/util';
import Technique from '../lib/Technique.object';
//import { QWElement } from '@qualweb/qw-element';
//import { QWPage } from '@qualweb/qw-page';
import { WCAGTechniqueClass, ElementExists } from '../lib/decorators';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T24 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  @ElementExists
  execute(element: typeof window.qwElement, page: typeof window.qwPage): void {
    const test = new Test();

    const isFocusable = window.AccessibilityUtils.isElementFocusable(element, page);

    if (isFocusable) {
      const keepsFocus = window.AccessibilityUtils.isFocusableBrowser(page, element);
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
