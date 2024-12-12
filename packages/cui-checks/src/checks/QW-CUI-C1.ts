import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { Check } from '../lib/Check.object';

class QW_CUI_C1 extends Check {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    // Check code goes here
    console.log(element);

    test.verdict = Verdict.WARNING;
    test.resultCode = 'W1';

    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_CUI_C1 };
