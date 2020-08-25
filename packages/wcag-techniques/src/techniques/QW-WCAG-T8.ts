import { WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import { AccessibilityUtils } from '@qualweb/util';
import Technique from '../lib/Technique.object';
import { WCAGTechnique, ElementExists, ElementHasAttributes } from '../lib/decorators';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';

@WCAGTechnique
class QW_WCAG_T8 extends Technique {

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

    const default_title = ['spacer', 'image', 'picture', 'separador', 'imagem', 'fotografia'];

    const pattern = new RegExp('.+\\.(jpg|jpeg|png|gif|tiff|bmp)');
    const pattern1 = new RegExp('^picture\\s[0-9]+$');
    const pattern2 = new RegExp('^[0-9]+$');
    const pattern3 = new RegExp('^intro#[0-9]+$');
    const pattern4 = new RegExp('^imagem\\s[0-9]+$');

    let altText = AccessibilityUtils.getAccessibleName(element, page);
    if (!altText || altText === ''){
        evaluation.verdict = 'inapplicable';
        evaluation.description = 'Text alternative is not actually a text alternative for the non-text content';
        evaluation.resultCode = 'RC1';
    } else {
      altText = altText.toLocaleLowerCase();
      if(!pattern4.test(altText) && !pattern3.test(altText) && !pattern2.test(altText) && !pattern1.test(altText) && !pattern.test(altText) && !default_title.includes(altText)) {
        evaluation.verdict = 'warning';
        evaluation.description = `Text alternative needs manual verification`;
        evaluation.resultCode = 'RC2';
      } else{
        evaluation.verdict = 'failed';
        evaluation.description = 'Text alternative is not actually a text alternative for the non-text content';
        evaluation.resultCode = 'RC3';
      }
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_WCAG_T8;
