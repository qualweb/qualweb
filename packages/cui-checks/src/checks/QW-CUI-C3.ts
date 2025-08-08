import type { QWElement } from '@qualweb/qw-element';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { Check } from '../lib/Check.object';
import { detectLocaleFromDateString } from '../lib/dates';
import { ElementExists, ElementHasAttribute } from '@qualweb/util/applicability';
// Check if date is in format of users locale

class QW_CUI_C3 extends Check {
  @ElementExists
  @ElementHasAttribute('qw-cui-date')
  async execute(element?: QWElement): Promise<void> {
    const test = new Test();

    if (element === undefined) {
      test.verdict = Verdict.INAPPLICABLE;
      test.resultCode = 'I1';
    } else {
      const locale = (this.settings?.['locale'] as string) || 'en-US';

      let attributeValue = element.getElementAttribute('data-qw-date');
      if (attributeValue === null) {
        test.verdict = Verdict.INAPPLICABLE;
        test.resultCode = 'I1';
        this.addTestResult(test);
        return;
      }

      let localeDate = detectLocaleFromDateString(attributeValue, locale);
      if (localeDate === null) {
        test.verdict = Verdict.FAILED;
        test.resultCode = 'F1';
        test.addElement(element);
      } else {
        test.verdict = Verdict.PASSED;
        test.resultCode = 'P1';
        test.addElement(element);
      }
      this.addTestResult(test);
    }
  }
}

export { QW_CUI_C3 };
