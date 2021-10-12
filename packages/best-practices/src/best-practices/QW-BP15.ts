import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists, ElementIsVisible } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@BestPracticeClass
class QW_BP15 extends BestPracticeObject {
  private readonly absoluteLengths = ['cm', 'mm', 'in', 'px', 'pt', 'pc'];

  constructor(bestPractice: BestPractice, locale: Translate) {
    super(bestPractice, locale);
  }

  @ElementExists
  @ElementIsVisible
  execute(element: typeof window.qwElement): void {
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
    super.addTestResult(test);
  }
}

export = QW_BP15;
