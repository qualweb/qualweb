import type { QWElement } from '@qualweb/qw-element';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { Check } from '../lib/Check.object';

import { IReadibiltyScores, readability } from '../lib/readability';
import { ElementExists } from '@qualweb/util/applicability';

class QW_CUI_C2 extends Check {
  @ElementExists
  async execute(element?: QWElement): Promise<void> {
    const test = new Test();

    if (element === undefined) {
      test.verdict = Verdict.WARNING;
      test.resultCode = 'W1';
    } else {
      let textContent = element.getElementText();
      // check if textContent has more than 2 words
      if (textContent === null) {
        test.verdict = Verdict.INAPPLICABLE;
        test.resultCode = 'I1';
        test.addElement(element);
      }
      const words = textContent.trim().split(/\s+/);
      if (words.length <= 3) {
        test.verdict = Verdict.INAPPLICABLE;
        test.resultCode = 'I2';
        test.addElement(element);
        this.addTestResult(test);
        return;
      }
      const locale = (this.settings?.['locale'] as string) || 'en-US';
      const language = locale.split('-')[0];
      const metrics: IReadibiltyScores = await readability(textContent, language);

      if (metrics['result'] >= 17) {
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

export { QW_CUI_C2 };
