import { WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { WCAGTechnique, ElementExists } from '../lib/decorators';

@WCAGTechnique
class QW_WCAG_T10 extends Technique {

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

    const images = element.getElements('img');
    let text = element.getElementText()

    const hasImage = images.length > 0;
    let hasNonEmptyAlt = false;
    let hasAlt = false;
    let equalAltText = false;

    for (const img of images || []) { // fails if the element doesn't contain an alt attribute
      if ((img.elementHasAttribute('alt')) && !hasNonEmptyAlt && !equalAltText) {
        hasAlt = true;
        const alt = img.getElementAttribute('alt');
        if (alt !== null) { 
          hasNonEmptyAlt = alt.trim() !== '';
          equalAltText = !!text && alt.trim() === text.trim();
        }
      }
    }

    if (!hasImage || !hasAlt || !text|| text.trim()==="") {
      //inapplicable 
    } else if (!hasNonEmptyAlt) {
      evaluation.verdict = 'passed';
      evaluation.description = `The a element contains an image that has an empty alt attribute`;
      evaluation.resultCode = 'RC1';
    } else if (equalAltText) {
      evaluation.verdict = 'failed';
      evaluation.description = `The link text is equal to the image's alternative text`;
      evaluation.resultCode = 'RC2';
    } else {
      evaluation.verdict = 'warning';
      evaluation.description = 'The link contains an image that has an alt attribute that should be manually verified';
      evaluation.resultCode = 'RC3';
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_WCAG_T10;
