import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';

@BestPracticeClass
class QW_BP7 extends BestPracticeObject {
  constructor(bestPractice: BestPractice) {
    super(bestPractice);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

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
      test.verdict = 'failed';
      test.description = `The title element contains other symbols than .,;-!?| and ()[]{}"' with text in between`;
      test.resultCode = `RC1`;
    } else {
      if (
        regExConsecutiveDots.test(titleValue) ||
        regExConsecutiveSymbols.test(titleValue) ||
        regExConsecutiveSpaces.test(titleValue)
      ) {
        test.verdict = 'failed';
        test.description = `The title element contains ASCII art`;
        test.resultCode = `RC2`;
      } else {
        test.verdict = 'passed';
        test.description = `The title element doesn't contain ASCII art`;
        test.resultCode = `RC3`;
      }
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_BP7;
