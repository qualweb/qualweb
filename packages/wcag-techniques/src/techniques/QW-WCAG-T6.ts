import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists, ElementHasAttributes, ElementIsVisible } from '../lib/decorators';
import { QWElement } from '@qualweb/qw-element';
//import { AccessibilityUtils } from '@qualweb/util';
import { QWPage } from '@qualweb/qw-page';
import Test from '../lib/Test.object';

@WCAGTechniqueClass
class QW_WCAG_T6 extends Technique {
  constructor(technique: WCAGTechnique) {
    super(technique);
  }

  @ElementExists
  @ElementHasAttributes
  @ElementIsVisible
  execute(element: QWElement, page: QWPage): void {
    const test = new Test();

    const isWidget = window.AccessibilityUtils.isElementWidget(element, page);

    if (!isWidget) {
      const hasOnkeypress = element.elementHasAttribute('onkeypress');
      const hasOnkeydown = element.elementHasAttribute('onkeydown');
      const hasOnkeyup = element.elementHasAttribute('onkeyup');

      if (!hasOnkeypress && !hasOnkeydown && !hasOnkeyup) {
        test.verdict = 'failed';
        test.description = `The mouse event attribute doesn't have a keyboard equivalent.`;
        test.resultCode = 'RC3';
      } else {
        const keyPress = element.getElementAttribute('onkeypress');
        const keyDown = element.getElementAttribute('onkeydown');
        const keyUp = element.getElementAttribute('onkeyup');

        if (element.elementHasAttribute('onmousedown')) {
          const event = element.getElementAttribute('onmousedown');

          if (event === keyPress || event === keyDown || event === keyUp) {
            this.fillPassedResult(test);
          } else {
            this.fillWarningResult(test);
          }
        }

        if (element.elementHasAttribute('onmouseup')) {
          const event = element.getElementAttribute('onmouseup');

          if (event === keyPress || event === keyDown || event === keyUp) {
            this.fillPassedResult(test);
          } else {
            this.fillWarningResult(test);
          }
        }

        if (element.elementHasAttribute('onclick')) {
          const event = element.getElementAttribute('onclick');

          if (event === keyPress || event === keyDown || event === keyUp) {
            this.fillPassedResult(test);
          } else {
            this.fillWarningResult(test);
          }
        }

        if (element.elementHasAttribute('onmouseover')) {
          const event = element.getElementAttribute('onmouseover');

          if (event === keyPress || event === keyDown || event === keyUp) {
            this.fillPassedResult(test);
          } else {
            this.fillWarningResult(test);
          }
        }

        if (element.elementHasAttribute('onmouseout')) {
          const event = element.getElementAttribute('onmouseout');

          if (event === keyPress || event === keyDown || event === keyUp) {
            this.fillPassedResult(test);
          } else {
            this.fillWarningResult(test);
          }
        }

        if (element.elementHasAttribute('onmouseenter')) {
          const event = element.getElementAttribute('onmouseenter');

          if (event === keyPress || event === keyDown || event === keyUp) {
            this.fillPassedResult(test);
          } else {
            this.fillWarningResult(test);
          }
        }

        if (element.elementHasAttribute('onmouseleave')) {
          const event = element.getElementAttribute('onmouseleave');

          if (event === keyPress || event === keyDown || event === keyUp) {
            this.fillPassedResult(test);
          } else {
            this.fillWarningResult(test);
          }
        }

        if (element.elementHasAttribute('onmousemove')) {
          const event = element.getElementAttribute('onmousemove');

          if (event === keyPress || event === keyDown || event === keyUp) {
            this.fillPassedResult(test);
          } else {
            this.fillWarningResult(test);
          }
        }

        if (element.elementHasAttribute('ondblclick')) {
          const event = element.getElementAttribute('ondblclick');

          if (event === keyPress || event === keyDown || event === keyUp) {
            this.fillPassedResult(test);
          } else {
            this.fillWarningResult(test);
          }
        }

        if (element.elementHasAttribute('onwheel')) {
          const event = element.getElementAttribute('onwheel');

          if (event === keyPress || event === keyDown || event === keyUp) {
            this.fillPassedResult(test);
          } else {
            this.fillWarningResult(test);
          }
        }
      }
      test.addElement(element);
      super.addTestResult(test);
    }
  }

  private fillPassedResult(test: Test): void {
    if (test.verdict === 'inapplicable') {
      test.verdict = 'passed';
      test.description = `The mouse event attribute has a keyboard equivalent.`;
      test.resultCode = 'RC1';
    }
  }

  private fillWarningResult(test: Test): void {
    test.verdict = 'warning';
    test.description = `The test target has a keyboard event, but we can't verify if it's equivalent to the mouse event.`;
    test.resultCode = 'RC2';
  }
}

export = QW_WCAG_T6;
