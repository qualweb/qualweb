import { BestPractice, BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';

@BestPracticeClass
class QW_BP15 extends BestPracticeObject {
  private readonly absoluteLengths = ['cm', 'mm', 'in', 'px', 'pt', 'pc'];

  constructor(bestPractice: BestPractice) {
    super(bestPractice);
  }

  @ElementExists
  execute(element: QWElement): void {
    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const width = <string>element.getElementAttribute('width');
    const unit = width.trim().substring(width.length - 2, width.length);

    if (!this.absoluteLengths.includes(unit)) {
      evaluation.verdict = 'passed';
      evaluation.description = 'The test target `width` attribute uses relative units.';
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = 'The test target `width` attribute uses absolute units.';
      evaluation.resultCode = 'RC2';
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_BP15;
