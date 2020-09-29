import { HTMLTechniqueResult } from '@qualweb/html-techniques';
import {  AccessibilityUtils } from '@qualweb/util';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';
import { WCAGTechnique, ElementExists } from '../lib/decorators';

@WCAGTechnique
class QW_WCAG_T24 extends Technique {

  constructor(technique?: any) {
    super(technique);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {

    const evaluation: HTMLTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const isFocusable = AccessibilityUtils.isElementFocusable(element,page);

    if (isFocusable) {
      const keepsFocus = AccessibilityUtils.isFocusableBrowser(page, element);
      if (keepsFocus) {
        evaluation.verdict = 'passed';
        evaluation.description = `Element kept focus`;
        evaluation.resultCode = 'RC1';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = `Element didn't keep focus`;
        evaluation.resultCode = 'RC2';
      }

      super.addEvaluationResult(evaluation, element);
    }
  }
}

export = QW_WCAG_T24;
