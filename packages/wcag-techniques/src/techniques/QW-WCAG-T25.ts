import { HTMLTechniqueResult } from '@qualweb/html-techniques';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { WCAGTechnique, ElementExists } from '../lib/decorators';

@WCAGTechnique
class QW_WCAG_T25 extends Technique {

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

    const name = element.getElementTagName();

    const hasScope = element.elementHasAttribute('scope');
    const scope = element.getElementAttribute('scope');

    if (name === 'th' && !hasScope) {
      evaluation.verdict = 'failed';
      evaluation.description = `The element doesn't contain a scope attribute`;
      evaluation.resultCode = 'RC1';
    } else if (name === 'th' && scope === '') {
      evaluation.verdict = 'failed';
      evaluation.description = `The element's scope attribute is empty`;
      evaluation.resultCode = 'RC2';
    } else if (scope && ['col', 'row', 'colgroup', 'rowgroup'].includes(scope)) {
      evaluation.verdict = 'passed';
      evaluation.description = 'The element\'s scope attribute matches the following values: col, row, colgroup, rowgroup';
      evaluation.resultCode = 'RC3';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = 'The element\'s scope attribute doesn\'t match any of the following values: col, row, colgroup, rowgroup';
      evaluation.resultCode = 'RC4';
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_WCAG_T25;
