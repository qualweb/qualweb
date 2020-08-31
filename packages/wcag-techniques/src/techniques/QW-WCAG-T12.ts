import { WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { WCAGTechnique, ElementExists } from '../lib/decorators';

@WCAGTechnique
class QW_WCAG_T12 extends Technique {

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

    let checks = {};
    checks['hasCaption'] = false;
    checks['hasTh'] = false;

    if (element.elementHasChildren()) {
      checks['hasCaption'] = !!(element.getElement('caption'));
      checks['hasTh'] = !!(element.getElement('th'));
    }

    const hasSummary = element.elementHasAttribute('summary');
    const summary = element.getElementAttribute('summary');

    if (hasSummary && summary && summary.trim() !== '') {
      evaluation.verdict = 'failed';
      evaluation.description = `The table has a non-empty summary - Amend it if it's a layout table`;
      evaluation.resultCode = 'RC1';
    } else if (checks['hasTh']) {
      evaluation.verdict = 'failed';
      evaluation.description = `The table has a th element - Amend it if it's a layout table`;
      evaluation.resultCode = 'RC2';
    } else if (checks['hasCaption']) {
      evaluation.verdict = 'failed';
      evaluation.description = `The table has a caption element - Amend it if it's a layout table`;
      evaluation.resultCode = 'RC3';
    } else {
      evaluation.verdict = 'warning';
      evaluation.description = `No incorrect elements used in layout table`;
      evaluation.resultCode = 'RC4';
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_WCAG_T12;
