import { QWElement } from '@packages/qw-element/src';
import {
  ElementExists,
  ElementHasNonEmptyAttribute,
  IsHTMLDocument,
  IsInMainContext,
  IsLangSubTagValid
} from '@shared/applicability';
import { Test } from '@shared/classes';
import { Verdict } from '@shared/types';
import { BestPractice } from '../lib/BestPractice.object';

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
      test.verdict = Verdict.PASSED;
      test.resultCode = 'P1';
    } else {
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F1';
    }
    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_BP29 };
