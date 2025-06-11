import type { QWElement } from '@qualweb/qw-element';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { Check } from '../lib/Check.object';
import { recognizeCurrencyByLocale } from '../lib/currency';
import { ElementExists, ElementHasAttribute } from '@qualweb/util/applicability';

// Check if currency is in format of users locale

class QW_CUI_C6 extends Check {
    @ElementExists
    @ElementHasAttribute('qw-currency')
  async execute(element?: QWElement): Promise<void> {
    const test = new Test();
  
    if (element === undefined) {
      test.verdict = Verdict.INAPPLICABLE;
      test.resultCode = 'I1';
    } else {
      const locale = (this.settings['locale'] as string) || 'en-US';

      const result = recognizeCurrencyByLocale(locale, element.getElementText());

      if (result === null) {
        test.verdict = Verdict.INAPPLICABLE;
        test.resultCode = 'I2';
      } else if (result === true) {
        test.verdict = Verdict.PASSED;
        test.resultCode = 'C1';
        test.addElement(element);
      } else {
        test.verdict = Verdict.FAILED;
        test.resultCode = 'F1';
        test.addElement(element);
      }
      }

      this.addTestResult(test);
    
  }
}

export { QW_CUI_C6 };
