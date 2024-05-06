import type { QWElement } from '@packages/qw-element/src';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Technique } from '../lib/Technique.object';


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

  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const parent = element.getElementParent();

    if (parent) {
      const parentName = parent.getElementTagName();

      if (parentName !== 'head') {
        test.verdict = 'warning';
        test.description = `The element is not contained in the head element. Verify if this link is used for navigation, and if it is, it must be inside the <head>`;
        test.resultCode = 'W1';
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
      this.addTestResult(test);
    }
  }
}

export { QW_WCAG_T15 };
