import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementHasAttribute, ElementHasNonEmptyAttribute } from '@qualweb/common';
import { Test } from '@qualweb/common';
import { Verdict } from '@qualweb/common';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R4 extends AtomicRule {
  @ElementExists
  @ElementHasAttribute('content')
  @ElementHasNonEmptyAttribute('content')
  @ElementHasAttribute('http-equiv')
  @ElementHasNonEmptyAttribute('http-equiv')
  execute(element: QWElement): void {
    const content = <string>element.getElementAttribute('content');

    if (this.rule.metadata.passed + this.rule.metadata.failed > 0) {
      // only one meta needs to pass or fail, others will be discarded
      return;
    }

    let n = -1;

    const indexOf = content.indexOf(';');
    if (indexOf === -1) {
      // If it's a refresh
      if (this.checkIfIsNumber(content) && Number.isInteger(parseInt(content, 0))) {
        n = Number(content);
      }
    } else {
      // If it's a redirect
      const split = content.split(';');

      if (
        split.length === 2 &&
        split[0].trim() !== '' &&
        split[1].trim() !== '' &&
        this.checkIfIsNumber(split[0]) &&
        Number.isInteger(parseInt(split[0], 0))
      ) {
        n = Number(split[0]);
      }
    }

    if (n >= 0) {
      const test = new Test();

      if (n === 0) {
        // passes because the time is 0
        test.verdict = Verdict.PASSED;
        test.resultCode = 'P1';
      } else if (n > 72000) {
        // passes because the time is bigger than 72000
        test.verdict = Verdict.PASSED;
        test.resultCode = 'P2';
      } else {
        // fails because the time is in between 0 and 72000
        test.verdict = Verdict.FAILED;

        if (indexOf === -1) {
          test.description = this.translate('F1', { seconds: n });
          test.resultCode = 'F1';
        } else {
          test.description = this.translate('F2', { seconds: n });
          test.resultCode = 'F2';
        }
      }

      test.addElement(element);
      this.addTestResult(test);
    }
  }

  private checkIfIsNumber(num: string): boolean {
    let success = true;
    for (const n of num || []) {
      if (isNaN(parseInt(n, 0))) {
        success = false;
        break;
      }
    }

    return success;
  }
}

export { QW_ACT_R4 };
