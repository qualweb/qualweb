import { BestPracticeResult } from '@qualweb/best-practices';
import { DomUtils } from '@qualweb/util';
import BestPracticeObject from '../lib/BestPractice.object';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';
import { BestPractice } from '../lib/decorator';

@BestPractice
class QW_BP17 extends BestPracticeObject {

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  execute(element: QWElement | undefined, page: QWPage): void {

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (!element) {
      evaluation.verdict = 'failed';
      evaluation.description = `This page does not have links`;
      evaluation.resultCode = 'RC1';
    } else {
      const refElement = DomUtils.getElementReferencedByHREF(page, element);

      if (refElement) {
        evaluation.verdict = 'warning';
        evaluation.description = 'This link skips a content block';
        evaluation.resultCode = 'RC2';
      } else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `This link is not used to skip a content block`;
        evaluation.resultCode = 'RC4';
      }

      super.addEvaluationResult(evaluation, element);
    }
  }
}

export = QW_BP17;
