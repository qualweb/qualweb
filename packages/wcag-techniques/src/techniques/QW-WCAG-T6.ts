import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementHasAttributes, ElementIsVisible, ElementIsNotWidget } from '@qualweb/common';
import { Test, Verdict } from '@qualweb/common';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T6 extends Technique {
  @ElementExists
  @ElementHasAttributes
  @ElementIsVisible
  @ElementIsNotWidget
  execute(element: QWElement): void {
    const test = new Test();

    const hasOnkeypress = element.elementHasAttribute('onkeypress');
    const hasOnkeydown = element.elementHasAttribute('onkeydown');
    const hasOnkeyup = element.elementHasAttribute('onkeyup');

    if (!hasOnkeypress && !hasOnkeydown && !hasOnkeyup) {
      test.verdict = Verdict.FAILED;
      test.description = `The mouse event attribute doesn't have a keyboard equivalent.`;
      test.resultCode = 'RC3';
    } else {
      const keyPress = element.getElementAttribute('onkeypress');
      const keyDown = element.getElementAttribute('onkeydown');
      const keyUp = element.getElementAttribute('onkeyup');

      const attrs = [
        'onmousedown',
        'onmouseup',
        'onclick',
        'onmouseover',
        'onmouseout',
        'onmouseenter',
        'onmouseleave',
        'onmousemove',
        'ondblclick',
        'onwheel'
      ];

      for (const attr of attrs) {
        if (element.elementHasAttribute(attr)) {
          const event = element.getElementAttribute(attr);

          if (event === keyPress || event === keyDown || event === keyUp) {
            this.fillPassedResult(test);
          } else {
            this.fillWarningResult(test);
          }
        }
      }
    }
    test.addElement(element);
    this.addTestResult(test);
  }

  private fillPassedResult(test: Test): void {
    if (test.verdict === 'inapplicable') {
      test.verdict = Verdict.PASSED;
      test.resultCode = 'P1';
    }
  }

  private fillWarningResult(test: Test): void {
    test.verdict = Verdict.WARNING;
    test.resultCode = 'W1';
  }
}

export { QW_WCAG_T6 };
