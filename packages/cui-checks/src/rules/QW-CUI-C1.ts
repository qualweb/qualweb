import { CUICheck } from '@qualweb/cui-checks';
import { Translate } from '@qualweb/locale';
import { CUICheckDecorator, IsHTMLDocument } from '../lib/decorator';
import Test from '../lib/Test.object';

@CUICheckDecorator
class QW_CUI_C1 extends CUICheck {
  constructor(rule: CUICheck, locale: Translate) {
    super(rule, locale);
  }

  @IsHTMLDocument
  execute(element: typeof window.qwElement | undefined): void {
    //the first title element was already tested
    if (super.getNumberOfPassedResults() + super.getNumberOfFailedResults() === 0) {
      const test = new Test();
      // the first title element was not tested yet
      if (!element) {
        //the title element does not exit
        test.verdict = 'failed';
        test.resultCode = 'F1';
      }
      //the title element is empty
      else if (!element.getElementText() || element.getElementText().trim() === '') {
        test.verdict = 'failed';
        test.resultCode = 'F2';
      } else if (element.getElementAttribute('_documentSelector')) {
        test.verdict = 'failed';
        test.resultCode = 'F3';
      } else {
        //the title element exists and it's not empty
        test.verdict = 'passed';
        test.resultCode = 'P1';
      }

      if (element) {
        test.addElement(element);
      }

      super.addTestResult(test);
    }
  }
}

export = QW_CUI_C1;
