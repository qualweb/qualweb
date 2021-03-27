import { BestPractice, BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists, ElementHasChild } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';

@BestPracticeClass
class QW_BP12 extends BestPracticeObject {
  constructor(bestPractice: BestPractice) {
    super(bestPractice);
  }

  @ElementExists
  @ElementHasChild('tr')
  execute(element: QWElement): void {
    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const rows = element.getElements('tr');
    let firstRowChildren = new Array<QWElement>();
    if (rows.length > 0) {
      firstRowChildren = rows[0].getElementChildren();

      let i, scope;
      let scopeCole = true;

      for (i = 1; i < firstRowChildren.length; i++) {
        if (
          firstRowChildren[i].getElementTagName() === 'td' ||
          (firstRowChildren[i].getElementTagName() === 'th' && scopeCole)
        ) {
          scope = firstRowChildren[i].getElementAttribute('scope');
          scopeCole = scope === 'col';
        }
      }
      let scopeRow = true;
      let row;

      for (i = 1; i < rows.length; i++) {
        if (scopeRow) {
          row = rows[i];
          const cells = row.getElements('td');
          if (cells.length > 0) {
            scope = cells[0].getElementAttribute('scope');
            scopeRow = scope === 'row';
          }
        }
      }

      if (scopeCole && scopeRow) {
        evaluation.verdict = 'passed';
        evaluation.description = 'The scope attribute is correctly used.';
        evaluation.resultCode = 'RC1';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = 'The scope attribute is incorrectly used.';
        evaluation.resultCode = 'RC2';
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'The table has no rows.';
      evaluation.resultCode = 'RC3';
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_BP12;
