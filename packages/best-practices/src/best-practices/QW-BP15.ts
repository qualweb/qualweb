import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';

@BestPracticeClass
class QW_BP15 extends BestPracticeObject {
  private readonly absoluteLengths = ['cm', 'mm', 'in', 'px', 'pt', 'pc'];

  constructor(bestPractice: BestPractice) {
    super(bestPractice);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const width = <string>element.getElementAttribute('width');
    const unit = width.trim().substring(width.length - 2, width.length);

    if (!this.absoluteLengths.includes(unit)) {
      test.verdict = 'passed';
      test.description = 'The test target `width` attribute uses relative units.';
      test.resultCode = 'RC1';
    } else {
      test.verdict = 'failed';
      test.description = 'The test target `width` attribute uses absolute units.';
      test.resultCode = 'RC2';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_BP15;
