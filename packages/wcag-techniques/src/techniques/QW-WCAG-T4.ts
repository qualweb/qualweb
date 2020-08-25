import { WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { QWElement } from "@qualweb/qw-element";
import { AccessibilityUtils } from '@qualweb/util';
import { QWPage } from '@qualweb/qw-page';
import { WCAGTechnique, ElementExists } from '../lib/decorators';

@WCAGTechnique
class QW_WCAG_T4 extends Technique {

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

    const isDataTable = AccessibilityUtils.isDataTable(element, page);
    const caption = element.getElementChildTextContent('caption');
    const summary = element.getElementAttribute('summary');
    
    if(isDataTable){
      if (summary === null) {
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'The summary does not exist in the table element';
        evaluation.resultCode = 'RC1';
      } else if (!summary.trim().length) {
        evaluation.verdict = 'failed';
        evaluation.description = 'The summary is empty';
        evaluation.resultCode = 'RC2';
      } else if (caption && summary.trim() === caption.trim()) {
        evaluation.verdict = 'failed';
        evaluation.description = 'The caption is a duplicate of the summary';
        evaluation.resultCode = 'RC3';
      } else {
        evaluation.verdict = 'warning';
        evaluation.description = 'Please verify that the summary is a valid description of the table';
        evaluation.resultCode = 'RC4';
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'This table is not a data table';
      evaluation.resultCode = 'RC5';
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_WCAG_T4;
