import { WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { WCAGTechnique, ElementExists } from '../lib/decorators';

@WCAGTechnique
class QW_WCAG_T17 extends Technique {

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

    const result = this.verifyInputLabelPosition(element);

    if (result === 'checkbox') {
      evaluation.verdict = 'failed';
      evaluation.description = 'The checkbox label is not immediately after the field';
      evaluation.resultCode = 'RC1';
    } else if (result === 'radio') {
      evaluation.verdict = 'failed';
      evaluation.description = 'The radio label is not immediately after the field';
      evaluation.resultCode = 'RC2';
    } else if (result === 'other') {
      evaluation.verdict = 'failed';
      evaluation.description = 'The form field label is not immediately before the field';
      evaluation.resultCode = 'RC3';
    } else if (result === 'noLabel') {
      evaluation.verdict = 'failed';
      evaluation.description = 'The form field does not have a label';
      evaluation.resultCode = 'RC4';
    } else if (result === 'pass') {
      evaluation.verdict = 'passed';
      evaluation.description = 'The form field has well positioned label';
      evaluation.resultCode = 'RC5';
    }

    super.addEvaluationResult(evaluation, element);
  }

  private verifyInputLabelPosition(element: QWElement): string | undefined {
    if (element.elementHasAttributes()) {
      const type = element.getElementAttribute('type');

      const prevElement = element.getElementPreviousSibling();
      let prevElementTagName;
      let prevElementHasAttributes;
      let prevElementAttributeFor;

      if (prevElement) {
        prevElementTagName = prevElement.getElementTagName();
        prevElementHasAttributes = prevElement.elementHasAttributes();
        prevElementAttributeFor = prevElement.getElementAttribute('for');
      }

      const nextElement = element.getElementNextSibling();
      let nextElementTagName: string | undefined;
      let nextElementHasAttributes: boolean | undefined;
      let nextElementAttributeFor!: string | null;

      if (nextElement) {
        nextElementTagName = nextElement.getElementTagName();
        nextElementHasAttributes = nextElement.elementHasAttributes();
        nextElementAttributeFor = nextElement.getElementAttribute('for');
      }

      const elementId = element.getElementAttribute('id');

      if (type && (type === 'radio' || type === 'checkbox')) {
        if (nextElement) {
          if (nextElementTagName === 'label' && nextElementHasAttributes && nextElementAttributeFor === elementId) {
            return 'pass';
          }
        } else if (prevElement) {
          if (prevElementTagName === 'label' && prevElementHasAttributes && prevElementAttributeFor === elementId) {
            return type;
          }
        } else {
          return 'noLabel';
        }
      }
      if (type && (type !== 'checkbox' && type !== 'radio')) {
        if (prevElement) {
          if (prevElementTagName === 'label' && prevElementHasAttributes && prevElementAttributeFor === elementId) {
            return 'pass';
          }
        } else if (nextElement) {
          if (nextElementTagName === 'label' && nextElementHasAttributes && nextElementAttributeFor === elementId) {
            return 'other';
          }
        } else {
          return 'noLabel';
        }
      }
    }

    return undefined;
  }
}

export = QW_WCAG_T17;
