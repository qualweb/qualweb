import {
  ElementExists,
  ElementHasNonEmptyAttribute,
  IsHTMLDocument,
  IsInMainContext,
  IsLangSubTagValid,
  Test
} from '@qualweb/lib';
import { BestPractice } from '../lib/BestPractice.object';
import { QWElement } from '@qualweb/qw-element';

class QW_BP29 extends BestPractice {
  @ElementExists
  @IsHTMLDocument
  @IsInMainContext
  @ElementHasNonEmptyAttribute('lang')
  @ElementHasNonEmptyAttribute('xml:lang')
  @IsLangSubTagValid('lang')
  @IsLangSubTagValid('xml:lang')
  execute(element: QWElement): void {
    const lang = element.getElementAttribute('lang')!;
    const xmlLang = element.getElementAttribute('xml:lang')!;

    const primaryLang = lang.split('-')[0];
    const primaryXmlLang = xmlLang.split('-')[0];

    const test = new Test();

    if (primaryLang.toLowerCase() === primaryXmlLang.toLowerCase()) {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }
    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_BP29 };
