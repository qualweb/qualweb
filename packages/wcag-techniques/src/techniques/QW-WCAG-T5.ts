import { WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { WCAGTechnique, ElementExists } from '../lib/decorators';

@WCAGTechnique
class QW_WCAG_T5 extends Technique {

  constructor(technique?: any) {
    super(technique);
  }

  @ElementExists
  execute(element: QWElement): void {

    const evaluation: WCAGTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const alt = element.getElementAttribute('alt');

    if (alt === null) {
      evaluation.verdict = 'failed';
      evaluation.description = 'The input element does not have an alt attribute';
      evaluation.resultCode = 'RC1';
    } else if (!alt.trim().length) {
      evaluation.verdict = 'failed';
      evaluation.description = 'The input element has an empty alt attribute';
      evaluation.resultCode = 'RC2';
    } else {
      evaluation.verdict = 'warning';
      evaluation.description = 'Please verify that the value of the alt attribute correctly describes the function of the button';
      evaluation.resultCode = 'RC3';
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_WCAG_T5;
