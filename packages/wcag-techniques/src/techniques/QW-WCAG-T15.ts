import { WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { WCAGTechnique, ElementExists } from '../lib/decorators';

@WCAGTechnique
class QW_WCAG_T15 extends Technique {

  constructor(technique?: any) {
    super(technique);
  }

  @ElementExists
  execute(element: QWElement): void {

    const parent = element.getElementParent();

    const evaluation: WCAGTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (parent) {
      const parentName = parent.getElementTagName();

      if (parentName !== 'head') {
        evaluation.verdict = 'warning';
        evaluation.description = `The element is not contained in the head element. Verify if this link is used for navigation, and if it is, it must be inside the <head>`;
        evaluation.resultCode = 'RC1';
      } else if (!(element.elementHasAttributes())) { // fails if the element doesn't contain an attribute
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The element doesn't contain a rel or an href attribute`;
        evaluation.resultCode = 'RC2';
      } else {
        const rel = element.getElementAttribute('rel');
        const href = element.getElementAttribute('href');

        const relNavigationValues = ['alternate', 'author', 'canonical', 'help', 'license', 'manifest', 'next', 'prev', 'search'];

        const relForNavigation = rel && relNavigationValues.includes(rel.toLowerCase());

        if (!relForNavigation) {
          evaluation.verdict = 'inapplicable';
          evaluation.description = `The element doesn't contain a rel attribute or doesn't pertains navigation`;
          evaluation.resultCode = 'RC3';
        } else if (!href) {
          evaluation.verdict = 'failed';
          evaluation.description = `The element doesn't contain an href attribute and pertains navigation`;
          evaluation.resultCode = 'RC4';
        } else {
          evaluation.verdict = 'passed';
          evaluation.description = 'The link has rel and href attributes and pertains navigation';
          evaluation.resultCode = 'RC5';
        }
      }
      super.addEvaluationResult(evaluation, element);
    }
  }
}

export = QW_WCAG_T15;
