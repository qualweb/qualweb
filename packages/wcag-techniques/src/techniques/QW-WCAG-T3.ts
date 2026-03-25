import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T3 extends Technique {
  @ElementExists
execute(element: QWElement): void {
    const test = new Test();
    const children = element.getElementChildren();
    const firstChild = children.length > 0 ? children[0] : null;
    
    const hasLegendAsFirstChild = firstChild && firstChild.getElementTagName().toLowerCase() === 'legend';
    const legendText = element.getElementChildTextContent('legend')?.trim();
    
    if (!legendText) {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F1';
    } else if (!hasLegendAsFirstChild) {
      test.verdict = Verdict.WARNING;
      test.resultCode = 'W1';
    } else {
      test.verdict = Verdict.PASSED;
      test.resultCode = 'P1';
    }

    test.addElement(element);
    this.addTestResult(test);
  }
}
export { QW_WCAG_T3 };
