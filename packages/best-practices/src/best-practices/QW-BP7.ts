import { BestPractice, BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';

@BestPracticeClass
class QW_BP7 extends BestPracticeObject {
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

    const titleValue = element.getElementText().replace(/\s/g, '');
    const regExConsecutiveSymbols = new RegExp("[,\\-;!?'][,\\-;!?']");
    const regExAllowedSymbols = new RegExp('^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF0-9.,\\-;:!?| ]*$');
    const regExAllowBracketsWithText = new RegExp(
      /(\([a-zA-Z\u00C0-\u024F\u1E00-\u1EFF0-9.,\-;!?: ]*\))|(\[[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF0-9.,\-;!?: ]*\])|(\{[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF0-9.,\-;!?: ]*\})|(\"[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF0-9.,\-;!?: ]*\")|(\'[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF0-9.,\-;!?: ]*\')/
    );
    const regExConsecutiveDots = new RegExp('^[^.]*(\\.{2}(\\.{2,})?)[^.]*$');
    const regExConsecutiveSpaces = new RegExp('[ ][ ]');

    let titleValueWithoutBrackets = titleValue;
    let occurrence;
    let allDone = false;
    while (regExAllowBracketsWithText.test(titleValueWithoutBrackets) && !allDone) {
      occurrence = regExAllowBracketsWithText.exec(titleValueWithoutBrackets);
      if (occurrence) {
        titleValueWithoutBrackets = titleValueWithoutBrackets.replace(occurrence[0], '');
      } else {
        allDone = true;
      }
    }

    if (!regExAllowedSymbols.test(titleValueWithoutBrackets)) {
      evaluation.verdict = 'failed';
      evaluation.description = `The title element contains other symbols than .,;-!?| and ()[]{}"' with text in between`;
      evaluation.resultCode = `RC1`;
    } else {
      if (
        regExConsecutiveDots.test(titleValue) ||
        regExConsecutiveSymbols.test(titleValue) ||
        regExConsecutiveSpaces.test(titleValue)
      ) {
        evaluation.verdict = 'failed';
        evaluation.description = `The title element contains ASCII art`;
        evaluation.resultCode = `RC2`;
      } else {
        evaluation.verdict = 'passed';
        evaluation.description = `The title element doesn't contain ASCII art`;
        evaluation.resultCode = `RC3`;
      }
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_BP7;
