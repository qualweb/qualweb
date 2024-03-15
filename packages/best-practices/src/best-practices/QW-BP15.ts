import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementIsVisible, Test } from '@qualweb/lib';
import { BestPractice } from '../lib/BestPractice.object';

class QW_BP15 extends BestPractice {
  private readonly absoluteLengths = ['cm', 'mm', 'in', 'px', 'pt', 'pc'];

  @ElementExists
  @ElementIsVisible
  execute(element: QWElement): void {
    const test = new Test();

    const width = <string>element.getElementAttribute('width');
    const unit = width.trim().substring(width.length - 2, width.length);

    if (!this.absoluteLengths.includes(unit) && parseFloat(width).toString().length !== width.length) {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }

    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_BP15 };
