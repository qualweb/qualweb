import { HTMLTechniqueResult } from '@qualweb/html-techniques';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { WCAGTechnique, ElementExists } from '../lib/decorators';

@WCAGTechnique
class QW_HTML_T43 extends Technique {

  constructor(technique?: any) {
    super(technique);
  }

  @ElementExists
  execute(element: QWElement | undefined): void {

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (!element) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'There is no element eligible to use the \'align\' attribute';
      evaluation.resultCode = 'RC1';
    } else {
      const alignAttribute = element.getElementAttribute('align');

      if (alignAttribute) {
        if (alignAttribute.trim() === 'justify') {
          evaluation.verdict = 'failed';
          evaluation.description = 'This content shouldn\'t be justified';
          evaluation.resultCode = 'RC2';
        } else {
          evaluation.verdict = 'passed';
          evaluation.description = 'This content is not justified';
          evaluation.resultCode = 'RC3';
        }
      } else {
        return; // if it doesnt have the align attribute, it doesnt matter
      }
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_HTML_T43;
