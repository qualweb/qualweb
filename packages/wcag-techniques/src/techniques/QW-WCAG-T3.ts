import { WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';
import { WCAGTechnique, ElementExists } from '../lib/decorators';

@WCAGTechnique
class QW_WCAG_T3 extends Technique {

  constructor(technique?: any) {
    super(technique);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {

    const evaluation: WCAGTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };
    
    const formATT = element.getElementAttribute('form');
    
    let validFormAtt = new Array<any>();

    if(formATT){
      validFormAtt = page.getElements(`form[id="${formATT}"]`);
    }

    const hasParent = element.elementHasParent('form');
    const hasChild = element.elementHasChild('legend');
    const childText = element.getElementChildTextContent('legend');

    if (!hasParent && validFormAtt.length === 0) {
      evaluation.verdict = 'failed';
      evaluation.description = 'The fieldset is not in a form and is not referencing a form';
      evaluation.resultCode = 'RC1';
    } else if (!hasChild) {
      evaluation.verdict = 'failed';
      evaluation.description = 'The legend does not exist in the fieldset element';
      evaluation.resultCode = 'RC2';
    } else if (childText && childText.trim() === '') {
      evaluation.verdict = 'failed';
      evaluation.description = 'The legend is empty';
      evaluation.resultCode = 'RC3';
    } else {
      evaluation.verdict = 'warning';
      evaluation.description = 'Please verify that the legend description is valid';
      evaluation.resultCode = 'RC4';
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_WCAG_T3;
