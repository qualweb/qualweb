import { WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { WCAGTechnique, ElementExists } from '../lib/decorators';

@WCAGTechnique
class QW_WCAG_T2 extends Technique {

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

    const hasChild = element.elementHasChild('caption');
    const childText = element.getElementChildTextContent('caption');

    if (!hasChild) {
      evaluation.verdict = 'failed';
      evaluation.description = 'The caption does not exist in the table element';
      evaluation.resultCode = 'RC1';
    } else if (!childText ||childText && childText.trim() === '') {
      evaluation.verdict = 'failed';
      evaluation.description = 'The caption is empty';
      evaluation.resultCode = 'RC2';
    } else {
      evaluation.verdict = 'warning';
      evaluation.description = 'Please verify that the caption element identifies the table correctly.';
      evaluation.resultCode = 'RC3';
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_WCAG_T2;
