import { CSSTechniqueResult } from '@qualweb/css-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechnique, ElementExists } from '../lib/decorators';
import { QWElement } from '@qualweb/qw-element';

@WCAGTechnique
class QW_WCAG_T29 extends Technique {

  constructor(technique?: any) {
    super(technique);
  }

  @ElementExists
  execute(element: QWElement): void {

    if (element.getElementTagName() === 'style') {
      const sheet = <any> element.getElementProperty('sheet');
      for (const rule of sheet.cssRules || []) {
        const style = rule?.style?.cssText;
        if (style) {
          this.checkCssProperty(style, element);
        }
      }
    } else {
      const style = <string> element.getElementAttribute('style');
      this.checkCssProperty(style, element);
    }
  }

  private checkCssProperty(style: string, element: QWElement): void {
    
    const evaluation: CSSTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const properties = style.split(';').filter(p => p.trim() !== '') || [style];
      
    for (const property of properties) {
      if (property.includes('text-align')) {
        const textAlign = property.split(':')[1];
        const isJustified = textAlign.includes('justify');
        
        if (!isJustified) {
          evaluation.verdict = 'passed';
          evaluation.description = 'This test target has a text-align css property equal to justify.';
          evaluation.resultCode = 'RC1';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = 'This test target has a text-align css property not equal to justify.';
          evaluation.resultCode = 'RC2';
        }

        evaluation.pointer = element.getElementSelector();
        evaluation.htmlCode = element.getElementHtmlCode(true, true);
        evaluation.attributes = property;

        super.addEvaluationResult(evaluation);
      }
    }
  }
}

export = QW_WCAG_T29;
