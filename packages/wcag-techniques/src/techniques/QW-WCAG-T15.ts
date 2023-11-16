import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

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

  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
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
          test.resultCode = 'I2';
        } else if (!href) {
          test.verdict = 'failed';
          test.resultCode = 'F1';
        } else {
          test.verdict = 'passed';
          test.resultCode = 'P1';
        }
      }

      test.addElement(element);
      super.addTestResult(test);
    }
  }
}

export = QW_WCAG_T15;
