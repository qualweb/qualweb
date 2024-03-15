import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, Test } from '@qualweb/lib';
import { BestPractice } from '../lib/BestPractice.object';


class QW_BP7 extends BestPractice {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const titleText = element.getElementText().replace(/\s/g, '');

    const regExp = new RegExp('@([[:punct:]]{4,})@iU');
    if (!regExp.test(titleText)) {
      test.verdict = 'passed';
      test.resultCode = `P1`;
    } else {
      test.verdict = 'failed';
      test.resultCode = `F1`;
    }

    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_BP7 };
