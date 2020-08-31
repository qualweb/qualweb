import { WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import { AccessibilityUtils } from '@qualweb/util';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';
import { WCAGTechnique, ElementExists, ElementHasAttributes } from '../lib/decorators';

@WCAGTechnique
class QW_WCAG_T21 extends Technique {

  constructor(technique?: any) {
    super(technique);
  }

  @ElementExists
  @ElementHasAttributes
  execute(element: QWElement, page: QWPage): void {

    const evaluation: WCAGTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const img = element.getElement('img');
    const aText = element.getElementText();

    if (!(aText !== undefined && aText.trim() !== '' || !img)) {
      if (AccessibilityUtils.getAccessibleName(element, page)) {
        evaluation.verdict = 'passed';
        evaluation.description = `The link has an accessible name`;
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = `The image doesn't have an accessible name`;
      }

      super.addEvaluationResult(evaluation, element);
    }

    /*if (aText !== undefined && aText.trim() !== '' || !img) {

    } else if (AccessibilityUtils.getAccessibleName(element, page)) {
      evaluation.verdict = 'passed';
      evaluation.description = `The link has an accessible name`;
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = `The image doesn't have an accessible name`;
    }

    super.addEvaluationResult(evaluation, element);*/
  }
}

export = QW_WCAG_T21;
