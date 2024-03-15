import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementHasAttributes, ElementIsVisible, Test } from '@qualweb/lib';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T26 extends Technique {
  @ElementExists
  @ElementHasAttributes
  @ElementIsVisible
  execute(element: QWElement): void {
    const test = new Test();

    if (window.AccessibilityUtils.isElementWidget(element)) {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }

    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_WCAG_T26 };
