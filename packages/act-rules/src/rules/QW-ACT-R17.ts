import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementIsImage } from '@qualweb/common';
import { Test } from '@qualweb/common';
import { Verdict } from '@qualweb/common';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R17 extends AtomicRule {
  @ElementExists
  @ElementIsImage
  execute(element: QWElement): void {
    const test = new Test();

    const name = element.getElementTagName();
    const elementInAT = window.AccessibilityUtils.isElementInAT(element);
    const role = window.AccessibilityUtils.getElementRole(element);
    const hidden = window.DomUtils.isElementHidden(element);

    const alt = element.getElementAttribute('alt');

    if (name === 'img' && !hidden && (alt === '' || role === 'presentation' || role === 'none')) {
      test.verdict = Verdict.PASSED;
      test.resultCode = 'P1';

      test.addElement(element);
      this.addTestResult(test);
    } else if (elementInAT) {
      const accessibleName = window.AccessibilityUtils.getAccessibleName(element);
      if (accessibleName && accessibleName.trim() !== '') {
        test.verdict = Verdict.PASSED;
        test.resultCode = 'P2';
      } else {
        test.verdict = Verdict.FAILED;
        test.resultCode = 'F1';
      }

      test.addElement(element, true, false, true);
      this.addTestResult(test);
    }
  }
}

export { QW_ACT_R17 };
