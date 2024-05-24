import type { QWElement } from '@packages/qw-element/src';
import { ElementExists, ElementHasAttribute, ElementIsDataTable } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Verdict } from '@shared/types';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T4 extends Technique {
  @ElementExists
  @ElementIsDataTable
  @ElementHasAttribute('summary')
  execute(element: QWElement): void {
    const test = new Test();

    const caption = element.getElementChildTextContent('caption');
    const summary = <string>element.getElementAttribute('summary');

    if (!summary.trim().length) {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F1';
    } else if (summary.trim() === caption?.trim()) {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F2';
    } else {
      test.verdict = Verdict.WARNING;
      test.resultCode = 'W1';
    }

    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_WCAG_T4 };
