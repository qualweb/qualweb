import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists, ElementHasAttributes, ElementIsVisible } from '../lib/applicability';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T26 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  @ElementExists
  @ElementHasAttributes
  @ElementIsVisible
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    if (window.AccessibilityUtils.isElementControl(element)) {
      test.verdict = 'passed';
      test.description = `The element is a user interface control with an event handler`;
      test.resultCode = 'RC1';
    } else {
      test.verdict = 'failed';
      test.description = `The element is a forced user interface control without the proper role attribute`;
      test.resultCode = 'RC2';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_WCAG_T26;
