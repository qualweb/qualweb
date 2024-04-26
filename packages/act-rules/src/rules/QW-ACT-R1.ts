import type { QWElement } from '@qualweb/qw-element';
import { IsHTMLDocument } from '@shared/applicability';
import { Test } from '@shared/classes';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R1 extends AtomicRule {
  @IsHTMLDocument
  execute(element?: QWElement): void {
    //the first title element was already tested
    if (this.rule.metadata.passed + this.rule.metadata.failed === 0) {
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

      this.addTestResult(test);
    }
  }
}

export { QW_ACT_R1 };
