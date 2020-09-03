import { HTMLTechniqueResult } from '@qualweb/html-techniques';
import { AccessibilityUtils } from '@qualweb/util';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';
import { WCAGTechnique, ElementExists, ElementHasAttributes } from '../lib/decorators';

@WCAGTechnique
class QW_WCAG_T26 extends Technique {

  constructor(technique?: any) {
    super(technique);
  }

  @ElementExists
  @ElementHasAttributes
  execute(element: QWElement, page: QWPage): void {

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (AccessibilityUtils.isElementControl(element, page)) {
      evaluation.verdict = 'passed';
      evaluation.description = `The element is a user interface control with an event handler`;
      evaluation.resultCode = 'RC1';
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = `The element is a forced user interface control without the proper role attribute`;
      evaluation.resultCode = 'RC2';
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_WCAG_T26;
