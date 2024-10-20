import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { Technique } from '../lib/Technique.object';
class QW_WCAG_T12 extends Technique {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const checks: { [key: string]: boolean } = {};
    checks['hasCaption'] = false;
    checks['hasTh'] = false;

    if (element.elementHasChildren()) {
      checks['hasCaption'] = !!element.getElement('caption');
      checks['hasTh'] = !!element.getElement('th');
    }

    const summary = element.getElementAttribute('summary');

    if (summary?.trim() !== '') {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F1';
    } else if (checks['hasTh']) {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F2';
    } else if (checks['hasCaption']) {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F3';
    } else {
      test.verdict = Verdict.WARNING;
      test.resultCode = 'W1';
    }

    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_WCAG_T12 };
