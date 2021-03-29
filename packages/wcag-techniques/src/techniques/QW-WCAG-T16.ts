import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass } from '../lib/applicability';
import { HTMLValidationReport } from '@qualweb/html-validator';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T16 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  execute(): void {
    throw new Error('Method not implemented.');
  }

  validate(validation: HTMLValidationReport | undefined): void {
    for (const result of validation?.messages ?? []) {
      const test = new Test();

      if (result.type === 'error') {
        test.verdict = 'failed';
        test.resultCode = 'RC2';
      } else {
        test.verdict = 'warning';
        test.resultCode = 'RC3';
      }

      test.description = result.message;

      super.addTestResult(test);
    }

    if (super.getNumberOfFailedResults() + super.getNumberOfWarningResults() === 0) {
      super.addTestResult(new Test('passed', `The HTML document doesn't have errors,`, 'RC1'));
    }
  }
}

export = QW_WCAG_T16;
