import { BestPractice, BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';

@BestPracticeClass
class QW_BP6 extends BestPracticeObject {
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

    const MAX_LENGTH_TITLE = 100;

    const titleValue = element.getElementText();

    if (titleValue.length > MAX_LENGTH_TITLE) {
      evaluation.verdict = 'failed';
      evaluation.description = `The page title has more than ` + MAX_LENGTH_TITLE + ` characters`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'passed';
      evaluation.description = `The page title has less than ` + MAX_LENGTH_TITLE + ` characters`;
      evaluation.resultCode = 'RC2';
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_BP6;
