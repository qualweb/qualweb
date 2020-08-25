import { WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';

import { WCAGTechnique, ElementExists } from '../lib/decorators';
import { QWElement } from '@qualweb/qw-element';

@WCAGTechnique
class QW_WCAG_T1 extends Technique {

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

    if (alt === null) { // fails if the element doesn't contain an alt attribute
      evaluation.verdict = 'failed';
      evaluation.description = `The area element does not contain an alt attribute`;
      evaluation.resultCode = 'RC1';
    } else if (alt.trim() === '') { // fails if the element's alt attribute value is empty
      evaluation.verdict = 'failed';
      evaluation.description = `The are element contains an empty alt attribute`;
      evaluation.resultCode = 'RC2';
    } else { // the element contains an non-empty alt attribute, and it's value needs to be verified
      evaluation.verdict = 'warning';
      evaluation.description = 'Please verify that the alt attribute describes correctly the corresponding area of the image';
      evaluation.resultCode = 'RC3';
    }

    super.addEvaluationResult(evaluation);
  }
}

export = QW_WCAG_T1;