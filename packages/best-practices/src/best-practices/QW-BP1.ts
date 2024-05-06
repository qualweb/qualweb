import type { QWElement } from '@packages/qw-element/src';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP1 extends BestPractice {
  @ElementExists
  execute(element: QWElement): void {
    const headings = element.getElements('h1, h2, h3, h4, h5, h6, [role="heading"]');

    for (const heading of headings ?? []) {
      if (window.AccessibilityUtils.isElementInAT(heading) || window.DomUtils.isElementVisible(heading)) {
        const test = new Test('warning', undefined, 'W1');
        test.addElement(heading);
        this.addTestResult(test);
      }
    }

    if (this.bestPractice.metadata.warning === 0) {
      this.addTestResult(new Test('failed', undefined, 'F1'));
    }
  }
}

export { QW_BP1 };
