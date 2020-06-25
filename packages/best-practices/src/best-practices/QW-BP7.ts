'use strict';

import { BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPractice, ElementExists } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';

@BestPractice
class QW_BP7 extends BestPracticeObject {

  constructor(bestPractice?: any) {
    super(bestPractice);
  }

  @ElementExists
  execute(element: QWElement | undefined): void {

    if (!element) {
      return;
    }

    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    let titleValue =  element.getElementText().replace(/\s/g, '');
    const regExConsecutiveSymbols = new RegExp('[,\\-;!?\'][,\\-;!?\']');
    const regExAllowedSymbols = new RegExp('^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF0-9.,\\-;:!? ]*$');
    const regExAllowBracketsWithText = new RegExp(/(\([a-zA-Z\u00C0-\u024F\u1E00-\u1EFF0-9.,\-;!?: ]*\))|(\[[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF0-9.,\-;!?: ]*\])|(\{[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF0-9.,\-;!?: ]*\})|(\"[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF0-9.,\-;!?: ]*\")|(\'[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF0-9.,\-;!?: ]*\')/);
    const regExConsecutiveDots = new RegExp('^[^.]*(\\.{2}(\\.{2,})?)[^.]*$');
    const regExConsecutiveSpaces = new RegExp('[ ][ ]');

    let titleValueWithoutBrackets = titleValue;
    let occurrence;
    let allDone = false;
    while (regExAllowBracketsWithText.test(titleValueWithoutBrackets) && !allDone){
      occurrence = regExAllowBracketsWithText.exec(titleValueWithoutBrackets);
      if(occurrence) {
        titleValueWithoutBrackets = titleValueWithoutBrackets.replace(occurrence[0], '');
      } else {
        allDone = true;
      }
    }

    if (!regExAllowedSymbols.test(titleValueWithoutBrackets)) {
      evaluation.verdict = 'failed';
      evaluation.description = `The title element contains other symbols than .,;-!? and ()[]{}"' with text in between`;
      evaluation.resultCode = `RC1`;
    } else {
      if (regExConsecutiveDots.test(titleValue) || regExConsecutiveSymbols.test(titleValue) || regExConsecutiveSpaces.test(titleValue)) {
        evaluation.verdict = 'failed';
        evaluation.description = `The title element contains ASCII art`;
        evaluation.resultCode = `RC2`;
      } else {
        evaluation.verdict = 'passed';
        evaluation.description = `The title element doesn't contain ASCII art`;
        evaluation.resultCode = `RC3`;
      }
    }
    evaluation.htmlCode = element.getElementHtmlCode( true, true);
    evaluation.pointer = element.getElementSelector();
    super.addEvaluationResult(evaluation);
  }
}

export = QW_BP7;
