import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { QWElement } from '@qualweb/qw-element';
import { WCAGTechniqueClass, ElementExists } from '../lib/decorators';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T15 extends Technique {
  private readonly relNavigationValues = [
    'alternate',
    'author',
    'canonical',
    'help',
    'license',
    'manifest',
    'next',
    'prev',
    'search'
  ];

  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const parent = element.getElementParent();

    if (parent) {
      const parentName = parent.getElementTagName();

      if (parentName !== 'head') {
        test.verdict = 'warning';
        test.description = `The element is not contained in the head element. Verify if this link is used for navigation, and if it is, it must be inside the <head>`;
        test.resultCode = 'RC1';
      } else if (!element.elementHasAttributes()) {
        // fails if the element doesn't contain an attribute
        test.verdict = 'inapplicable';
        test.description = `The element doesn't contain a rel or an href attribute`;
        test.resultCode = 'RC2';
      } else {
        const rel = element.getElementAttribute('rel');
        const href = element.getElementAttribute('href');

        const relForNavigation = rel && this.relNavigationValues.includes(rel.toLowerCase());

        if (!relForNavigation) {
          test.verdict = 'inapplicable';
          test.description = `The element doesn't contain a rel attribute or doesn't pertains navigation`;
          test.resultCode = 'RC3';
        } else if (!href) {
          test.verdict = 'failed';
          test.description = `The element doesn't contain an href attribute and pertains navigation`;
          test.resultCode = 'RC4';
        } else {
          test.verdict = 'passed';
          test.description = 'The link has rel and href attributes and pertains navigation';
          test.resultCode = 'RC5';
        }
      }

      test.addElement(element);
      super.addTestResult(test);
    }
  }
}

export = QW_WCAG_T15;
