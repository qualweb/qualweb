import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementHasNonEmptyAttribute, IsHTMLDocument } from '@shared/applicability';
import { Test } from '@shared/classes';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R5 extends AtomicRule {

  @ElementExists
  @IsHTMLDocument
  @ElementHasNonEmptyAttribute('lang')
  execute(element: QWElement): void {
    const lang = <string>element.getElementAttribute('lang');

    const test = new Test();

    if (this.checkValidity(lang)) {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }

    test.addElement(element);
    this.addTestResult(test);
  }

  private checkValidity(lang: string): boolean {
    const subLangs = lang.toLowerCase().split('-');
    return window.AccessibilityUtils.languages[subLangs[0]] !== undefined;
  }
}

export { QW_ACT_R5 };
