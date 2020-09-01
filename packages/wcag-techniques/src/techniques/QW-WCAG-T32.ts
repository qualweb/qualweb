import { HTMLTechniqueResult } from '@qualweb/html-techniques';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { WCAGTechnique, ElementExists } from '../lib/decorators';

@WCAGTechnique
class QW_WCAG_T32 extends Technique {

  constructor(technique?: any) {
    super(technique);
  }

  @ElementExists
  execute(element: QWElement): void {

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const hasLi = (element.getElements('li')).length !== 0;
    const hasDd = (element.getElements('dd')).length !== 0;
    const hasDt = (element.getElements('dt')).length !== 0;

    const name = element.getElementTagName();

    if (hasLi && name === 'ul') { // fails if the element doesn't contain an alt attribute
      evaluation.verdict = 'warning';
      evaluation.description = 'Check that content that has the visual appearance of a list (with or without bullets) is marked as an unordered list';
      evaluation.resultCode = 'RC1';
    } else if (hasLi && name === 'ol') {
      evaluation.verdict = 'warning';
      evaluation.description = 'Check that content that has the visual appearance of a numbered list is marked as an ordered list.';
      evaluation.resultCode = 'RC2';
    } else if (name === 'dl' && (hasDt || hasDd)) {
      evaluation.verdict = 'warning';
      evaluation.description = 'Check that content is marked as a definition list when terms and their definitions are presented in the form of a list.';
      evaluation.resultCode = 'RC3';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = `A list item is not contained in a correct list element`;
      evaluation.resultCode = 'RC4';
    }

    super.addEvaluationResult(evaluation, element, true, true);
  }
}

export = QW_WCAG_T32;
