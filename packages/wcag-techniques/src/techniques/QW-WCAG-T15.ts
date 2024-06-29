import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@qualweb/common';
import { Test } from '@qualweb/common';
import { Verdict } from '@qualweb/common';
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
        test.verdict = Verdict.WARNING;
        test.description = `The element is not contained in the head element. Verify if this link is used for navigation, and if it is, it must be inside the <head>`;
        test.resultCode = 'W1';
      } else if (!element.elementHasAttributes()) {
        // fails if the element doesn't contain an attribute
        test.verdict = Verdict.INAPPLICABLE;
        test.description = `The element doesn't contain a rel or an href attribute`;
        test.resultCode = 'RC2';
      } else {
        const rel = element.getElementAttribute('rel');
        const href = element.getElementAttribute('href');

        const relForNavigation = rel && this.relNavigationValues.includes(rel.toLowerCase());

        if (!relForNavigation) {
          test.verdict = Verdict.INAPPLICABLE;
          test.resultCode = 'I2';
        } else if (!href) {
          test.verdict = Verdict.FAILED;
          test.resultCode = 'F1';
        } else {
          test.verdict = Verdict.PASSED;
          test.resultCode = 'P1';
        }
      }

      test.addElement(element);
      this.addTestResult(test);
    }
  }
}

export { QW_WCAG_T15 };
