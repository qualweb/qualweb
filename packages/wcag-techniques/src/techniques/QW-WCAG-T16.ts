import { WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechnique } from '../lib/decorators';
import { HTMLValidationReport } from '@qualweb/html-validator';

@WCAGTechnique
class QW_WCAG_T16 extends Technique {

  constructor(technique?: any) {
    super(technique);
  }

  execute(): void {
    throw new Error('Method not implemented.');
  }

  validate(validation: HTMLValidationReport | undefined): void {

    for (const result of validation?.messages || []) {
      const evaluation: WCAGTechniqueResult = {
        verdict: '',
        description: '',
        resultCode: ''
      };

      if (result.type === 'error') {
        evaluation.verdict = 'failed';
        evaluation.description = result.message;
        evaluation.resultCode = 'RC2';
      } else {
        evaluation.verdict = 'warning';
        evaluation.description = result.message;
        evaluation.resultCode = 'RC3';
      }

      super.addEvaluationResult(evaluation);
    }

    if (super.getNumberOfFailedResults() + super.getNumberOfWarningResults() === 0) {
      const evaluation: WCAGTechniqueResult = {
        verdict: 'passed',
        description: `The HTML document doesn't have errors`,
        resultCode: 'RC1'
      };

      super.addEvaluationResult(evaluation);
    }
  }
}

export = QW_WCAG_T16;
