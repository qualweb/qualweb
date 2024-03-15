import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, IsHTMLDocument, Test, IsInMainContext } from '@qualweb/lib';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R2 extends AtomicRule {

  @ElementExists
  @IsHTMLDocument
  @IsInMainContext
  execute(element: QWElement): void {
    const lang = element.getElementAttribute('lang');

    const test = new Test();

    if (lang && lang.trim() !== '') {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }

    test.addElement(element, false);
    this.addTestResult(test);
  }
}

export { QW_ACT_R2 };
