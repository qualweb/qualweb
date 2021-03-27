import { BestPractice, BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists, ElementHasChild } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';

@BestPracticeClass
class QW_BP11 extends BestPracticeObject {
  constructor(bestPractice: BestPractice) {
    super(bestPractice);
  }

  @ElementExists
  @ElementHasChild('*')
  execute(element: QWElement): void {
    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    let result = 0;
    let hasBr = false;

    for (const child of element.getElementChildren() || []) {
      const type = child.getElementType();
      if (child && child.getElementTagName() === 'br') {
        result++;
        hasBr = true;
      } else if (type !== 'text') {
        result = 0;
      }
    }

    if (result > 3) {
      evaluation.verdict = 'failed';
      evaluation.description = 'Br elements are being be used as a list';
      evaluation.resultCode = 'RC1';
    } else if (hasBr) {
      evaluation.verdict = 'passed';
      evaluation.description = 'There are less than 3 consecutive br.';
      evaluation.resultCode = 'RC2';
    }

    if (hasBr) {
      super.addEvaluationResult(evaluation, element);
    }
  }
}

export = QW_BP11;
