'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPractice, ElementExists, ElementHasChild } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';

@BestPractice
class QW_BP12 extends BestPracticeObject {

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  @ElementExists
  @ElementHasChild('tr')
  execute(element: QWElement | undefined): void {

    if (!element) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    let rows = element.getElements( "tr");
    let firstRowChildren: QWElement[] = [];
    if (rows.length > 0) {
      firstRowChildren =rows[0].getElementChildren();

      let i, scope;
      let scopeCole = true;

      for (i = 1; i < firstRowChildren.length; i++) {
        if (firstRowChildren[i].getElementTagName() === "td" || firstRowChildren[i].getElementTagName() === "th" && scopeCole) {
          scope = firstRowChildren[i].getElementAttribute( "scope");
          scopeCole = scope === "col"
        }
      }
      let scopeRow = true;
      let row;

      for (i = 1; i < rows.length; i++) {
        if ( scopeRow) {
          row = rows[i];
          let cells = row.getElements( "td");
          if (cells.length > 0) {
            scope = cells[0].getElementAttribute( "scope");
            scopeRow = scope === "row";
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
    evaluation.htmlCode = element.getElementHtmlCode( true, true);
    evaluation.pointer = element.getElementSelector();
    
    super.addEvaluationResult(evaluation);
  }


}

export = QW_BP12;
