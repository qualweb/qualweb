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

    if (summary && summary.trim() !== '') {
      test.verdict = Verdict.WARNING;
      test.resultCode = 'W1';
    } else if (checks['hasTh']) {
      test.verdict = Verdict.WARNING;
      test.resultCode = 'W2';
    } else if (checks['hasCaption']) {
      test.verdict = Verdict.WARNING;
      test.resultCode = 'W3';
    } else {
      test.verdict = Verdict.WARNING;
      test.resultCode = 'W4';
    }

    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_WCAG_T12 };
