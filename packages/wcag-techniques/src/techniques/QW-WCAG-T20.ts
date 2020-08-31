import { WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { WCAGTechnique, ElementExists, ElementHasAttributes } from '../lib/decorators';

@WCAGTechnique
class QW_WCAG_T20 extends Technique {

  constructor(technique?: any) {
    super(technique);
  }

  @ElementExists
  @ElementHasAttributes
  execute(element: QWElement): void {

    const evaluation: WCAGTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    let trimTitle: string | undefined;
    const title = element.getElementAttribute('title');
    if (title) {
      trimTitle = title.trim();
    }
    const text = element.getElementText();

    if (trimTitle !== undefined) {
      if (trimTitle === '') {
        evaluation.verdict = 'failed';
        evaluation.description = `The element's title attribute is empty`;
        evaluation.resultCode = 'RC1';
      } else if (text &&  trimTitle === text.trim()) {
        evaluation.verdict = 'failed';
        evaluation.description = `The element contains a title attribute equal to the text in the link`;
        evaluation.resultCode = 'RC2';
      } else {
        evaluation.verdict = 'warning';
        evaluation.description = `Please verify that the element's title attribute describes correctly the link`;
        evaluation.resultCode = 'RC3';
      }

      super.addEvaluationResult(evaluation, element);
    }
  }
}

export = QW_WCAG_T20;
