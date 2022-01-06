import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass } from '../lib/applicability';
import { HTMLValidationReport } from '@qualweb/html-validator';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@WCAGTechniqueClass
class QW_WCAG_T16 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
  }

  execute(): void {
    throw new Error('Method not implemented.');
  }

  validate(validation: HTMLValidationReport | undefined): void {
    if (validation) {
      for (const result of validation.messages ?? []) {
        const test = new Test();

        if (result.type === 'error') {
          test.verdict = 'failed';
          test.resultCode = 'F1';
        } else {
          test.verdict = 'warning';
          test.resultCode = 'W1';
        }

        test.description = result.message;

        super.addTestResult(test);
      }

      if (super.getNumberOfFailedResults() + super.getNumberOfWarningResults() === 0) {
        super.addTestResult(new Test('passed', undefined, 'P1'));
      }
    }
  }
}

export = QW_WCAG_T16;
