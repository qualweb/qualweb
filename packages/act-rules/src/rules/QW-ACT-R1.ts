import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, IsHTMLDocument } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R1 extends AtomicRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
  }

  @IsHTMLDocument
  execute(element: typeof window.qwElement | undefined): void {
    const test = new Test();

    //the first title element was already tested
    if (super.getNumberOfPassedResults() + super.getNumberOfFailedResults() === 0) {
      // the first title element was not tested yet
      if (!element) {
        //the title element does not exit
        test.verdict = 'failed';
        test.resultCode = 'RC2';
      }
      //the title element is empty
      else if (!element.getElementText() || element.getElementText().trim() === '') {
        test.verdict = 'failed';
        test.resultCode = 'RC3';
      } else if (element.getElementAttribute('_documentSelector')) {
        test.verdict = 'failed';
        test.resultCode = 'RC4';
      } else {
        //the title element exists and it's not empty
        test.verdict = 'passed';
        test.resultCode = 'RC1';
      }

      if (element) {
        test.addElement(element);
      }

      super.addTestResult(test);
    }
  }
}

export = QW_ACT_R1;
