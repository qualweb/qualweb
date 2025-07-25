import type { QWElement } from '@qualweb/qw-element';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { Check } from '../lib/Check.object';
import { recognizeUnitByLocale } from '../lib/units';
import { ElementExists, ElementHasAttribute } from '@qualweb/util/applicability';

//check if measurements are in format of users locale
class QW_CUI_C7 extends Check {
      @ElementExists
      @ElementHasAttribute('qw-unit')
    async execute(element?: QWElement): Promise<void> {
      const test = new Test();
    
      if (element === undefined) {
        test.verdict = Verdict.INAPPLICABLE;
        test.resultCode = 'I1';
      } else {
        const locale = (this.settings['locale'] as string) || 'en-US';

        const result = recognizeUnitByLocale(locale, element.getElementText());
    
        
        if (result === true) {
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

export { QW_CUI_C7 };
