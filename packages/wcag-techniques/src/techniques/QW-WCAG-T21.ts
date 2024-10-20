import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementHasAttributes, ElementIsInAccessibilityTree } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T21 extends Technique {
  @ElementExists
  @ElementHasAttributes
  @ElementIsInAccessibilityTree
  execute(element: QWElement): void {
    const test = new Test();

    const img = element.getElement('img');
    const aText = element.getElementText();

    if (!((aText !== undefined && aText.trim() !== '') || !img)) {
      if (window.AccessibilityUtils.getAccessibleName(element)) {
        test.verdict = Verdict.PASSED;
        test.resultCode = 'P1';
      } else {
        test.verdict = Verdict.FAILED;
        test.resultCode = 'F1';
      }

      test.addElement(element);
      this.addTestResult(test);
    }
  }
}

export { QW_WCAG_T21 };
