import { QWElement } from '@qualweb/qw-element';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { Check } from '../lib/Check.object';
import { ElementExists, ElementHasAttribute, ElementHasNonEmptyAttribute } from '@qualweb/util/applicability';
import { detectLanguage } from '../lib/language';

/**Answers are in same language than locale? */

class QW_CUI_C5 extends Check {
  @ElementExists
  @ElementHasAttribute('qw-cui-question')
  @ElementHasNonEmptyAttribute('qw-cui-question')
  async execute(element?: QWElement): Promise<void> {
    const test = new Test();
  
    if (element === undefined) {
      test.verdict = Verdict.INAPPLICABLE;
      test.resultCode = 'I1';
    } else {
      // get attribute qw-cui-question from element
      const questionNumber = element.getElementAttribute('qw-cui-question');

      const answerElements = document.querySelectorAll(`[qw-cui-response='${questionNumber}']`);
    
      if (answerElements.length === 0) {
        test.verdict = Verdict.INAPPLICABLE;
        test.resultCode = 'I1';
        this.addTestResult(test);
        return;
      }

      let textQuestion = element.getElementText();
      textQuestion = textQuestion.replace(/[\n\t]/g, '').trim().normalize("NFC");;
      let langQuestion: string = detectLanguage(textQuestion);

      for (const answerElement of answerElements) {
        let elementAnswer = new QWElement(answerElement);
        let textAnswer = elementAnswer.getElementText();
        textAnswer = textAnswer.replace(/[\n\t]/g, '').trim().normalize("NFC");
        let langAnswer: string = detectLanguage(textAnswer);

        if (langQuestion !== langAnswer) {
          test.verdict = Verdict.FAILED;
          test.resultCode = 'F1';
          test.addElement(elementAnswer);
        } else {
          test.verdict = Verdict.PASSED;
          test.resultCode = 'P1';
          test.addElement(elementAnswer);
        }
      }
    }
    this.addTestResult(test);
  }
}

export { QW_CUI_C5 };
