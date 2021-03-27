import { BestPractice, BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists, ElementIsNotChildOf } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';

@BestPracticeClass
class QW_BP4 extends BestPracticeObject {
  constructor(bestPractice: BestPractice) {
    super(bestPractice);
  }

  @ElementExists
  @ElementIsNotChildOf('nav')
  execute(element: QWElement): void {
    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const aCount = element.getNumberOfSiblingsWithTheSameTag();
    if (aCount >= 10) {
      evaluation.verdict = 'failed';
      evaluation.description = `It was found a group of 10 or more links not grouped within a nav element`;
      evaluation.resultCode = 'RC1';
    } else {
      return;
    }

    const parent = element.getElementParent();

    super.addEvaluationResult(evaluation, parent ? element : undefined);
  }
}

export = QW_BP4;
