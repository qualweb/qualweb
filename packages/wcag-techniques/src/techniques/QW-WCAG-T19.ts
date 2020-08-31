import { WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { WCAGTechnique, ElementExists } from '../lib/decorators';

@WCAGTechnique
class QW_WCAG_T19 extends Technique {

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

    const children = element.getElements(`input[type="submit"], input[type="image"], button[type="submit"]`);

    if (children.length > 0) { // the element contains one of the following elements input[type~='submit image'], button[type='submit']
      evaluation.verdict = 'passed';
      evaluation.description = `The form contains one of the following elements input[type~="submit image"], button[type="submit"]`;
      evaluation.resultCode = 'RC1';
    } else { // fails if none of the following elements was found input[type~='submit image'], button[type='submit']
      evaluation.verdict = 'failed';
      evaluation.description = `Form tag doesn't contain any of the following elements input[type~="submit image"], button[type="submit"]`;
      evaluation.resultCode = 'RC2';
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_WCAG_T19;
