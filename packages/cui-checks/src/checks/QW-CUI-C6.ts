import type { QWElement } from '@qualweb/qw-element';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { Check } from '../lib/Check.object';
import { CurrencyInfo, getCurrencyInfo } from '../lib/currency';

// Check if currency is in format of users locale

class QW_CUI_C6 extends Check {
  async execute(element?: QWElement): Promise<void> {
    const test = new Test();

    if (element === undefined) {
      test.verdict = Verdict.INAPPLICABLE;
      test.resultCode = 'I1';
    } else {
      const locale = (this.settings['locale'] as string) || 'en-US'; // Default to 'en-US' if locale is not available
      let currencyInfo: CurrencyInfo | null = getCurrencyInfo(locale);
      if (currencyInfo === null) {
        test.verdict = Verdict.INAPPLICABLE;
        test.resultCode = 'I2';
      } else {
        const currencyCode = currencyInfo.code;
        const currencyName = currencyInfo.name;
        const currencySymbol = currencyInfo.symbol;

        // Check if the element's text contains the currency code, name, or symbol
        const elementText = element.getElementText();
        if (
          elementText.includes(currencyCode) ||
          elementText.includes(currencyName) ||
          elementText.includes(currencySymbol)
        ) {
          test.verdict = Verdict.PASSED;
          test.resultCode = 'C1';
        } else {
          test.verdict = Verdict.FAILED;
          test.resultCode = 'F1';
        }
        test.addElement(element);
      }

      this.addTestResult(test);
    }
  }
}

export { QW_CUI_C6 };
