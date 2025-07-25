import type { QWElement } from '@qualweb/qw-element';
import { Test, Verdict } from '@qualweb/core/evaluation';

import { Check } from '../lib/Check.object';

class QW_CUI_C1 extends Check {

  async execute(element?: QWElement): Promise<void> {
    const test = new Test();
    if (element === undefined) {
      test.verdict = Verdict.WARNING;
      test.resultCode = 'W1';
    } else {
      test.verdict = Verdict.PASSED;
      test.resultCode = 'P1';
      test.addElement(element);
    }

    this.addTestResult(test);
  }
}

export { QW_CUI_C1 };
