import type { QWElement } from '@qualweb/qw-element';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { Check } from '../lib/Check.object';
import { detectLanguage } from '../lib/language';
/**Answers are in same language than locale? */
class QW_CUI_C4 extends Check {
  async execute(element?: QWElement): Promise<void> {
    const test = new Test();
    // strategy, run the test on all message elements check language with languageDetect tool, check if are in language of the locale page

    if (element === undefined) {
      test.verdict = Verdict.INAPPLICABLE;
      test.resultCode = 'I1';
    } else {
      // if locale is not set, use en-US as default
      const locale = (this.settings?.['locale'] as string) || 'en-US';

      // remove language from locale
      let language = locale.split('-')[0];

      let textContent = element.getElementText();
      // remover siglas
      textContent = textContent.replace(/([A-Z]{2,})/g, '');

      let langResponse: string = detectLanguage(textContent);

      if (langResponse.trim() === language.trim()) {
        test.verdict = Verdict.PASSED;
        test.resultCode = 'P1';
        test.addElement(element);
      } else {
        test.verdict = Verdict.FAILED;
        test.resultCode = 'F1';
        test.addElement(element);
      }
      this.addTestResult(test);
    }
  }
}

export { QW_CUI_C4 };
