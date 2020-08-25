import { WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { WCAGTechnique, ElementExists } from '../lib/decorators';

@WCAGTechnique
class QW_WCAG_T7 extends Technique {

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

    const hasTitle = element.elementHasAttribute('title');
    const title = element.getElementAttribute('title');

    if (hasTitle && title && title.trim() !== '') {
      evaluation.verdict = 'passed';
      evaluation.description = `The element abbrv has the definition in the title attribute`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = `The element abbrv doesn't have the definition in the title attribute`;
      evaluation.resultCode = 'RC2';
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_WCAG_T7;
