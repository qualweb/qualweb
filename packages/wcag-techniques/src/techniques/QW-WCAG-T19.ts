import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementIsVisible, Test } from '@qualweb/lib';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T19 extends Technique {

  @ElementExists
  @ElementIsVisible
  execute(element: QWElement): void {
    const test = new Test();

    const children = element.getElements(`input[type="submit"], input[type="image"], button[type="submit"]`);

    if (children.length > 0) {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }

    test.addElement(element);
    this.addTestResult(test);
  }
}

export { QW_WCAG_T19 };
