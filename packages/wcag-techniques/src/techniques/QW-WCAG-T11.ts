import { WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { WCAGTechnique, ElementExists } from '../lib/decorators';

@WCAGTechnique
class QW_WCAG_T11 extends Technique {

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

    const hasAlt = element.elementHasAttribute('alt');
    const alt = element.getElementAttribute('alt');

    if (!hasAlt) { // fails if the element doesn't contain an alt attribute
      evaluation.verdict = 'failed';
      evaluation.description = `The applet element does not contain an alt attribute`;
      evaluation.resultCode = 'RC1';
    } else if (alt && alt.trim() === '') { // fails if the element's alt attribute is empty
      evaluation.verdict = 'failed';
      evaluation.description = `The applet element has an empty alt attribute`;
      evaluation.resultCode = 'RC2';
    } else {
      const text = element.getElementText();
      console.log(text!== undefined);
      console.log(text);

      if (text && text.trim()!== "") { // the element contains a non empty alt attribute and a text in his body
        evaluation.verdict = 'warning';
        evaluation.description = `Please verify that the values of the alt attribute and the body text correctly describe the applet element`;
        evaluation.resultCode = 'RC3';
      } else { // fails if the element doesn't contain a text in the body
        evaluation.verdict = 'failed';
        evaluation.description = `The applet element does not contain alternative text in its body`;
        evaluation.resultCode = 'RC4';
      }
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_WCAG_T11;
