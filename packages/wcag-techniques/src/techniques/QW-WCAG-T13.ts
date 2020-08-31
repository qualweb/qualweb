import { WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { WCAGTechnique } from '../lib/decorators';

@WCAGTechnique
class QW_WCAG_T13 extends Technique {

  constructor(technique?: any) {
    super(technique);
  }

  execute(element: QWElement | undefined): void {

    const evaluation: WCAGTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (element !== undefined) {
      evaluation.verdict = 'failed';
      evaluation.description = 'Used blink element';
      evaluation.resultCode = 'RC1';
    } else { // success if refresh element doesn't exist
      evaluation.verdict = 'passed';
      evaluation.description = `Blink is not used`;
      evaluation.resultCode = 'RC2';
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_WCAG_T13;
