import { WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechnique, ElementExists, ElementHasAttributes } from '../lib/decorators';
import { QWElement } from "@qualweb/qw-element";
import { AccessibilityUtils } from '@qualweb/util';
import { QWPage } from '@qualweb/qw-page';

@WCAGTechnique
class QW_WCAG_T6 extends Technique {

  constructor(technique?: any) {
    super(technique);
  }

  @ElementExists 
  @ElementHasAttributes
  execute(element: QWElement, page: QWPage): void {

    const evaluation: WCAGTechniqueResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const isWidget = AccessibilityUtils.isElementWidget(element, page);

    if (!isWidget) {
      const hasOnkeypress = element.elementHasAttribute('onkeypress');
      const hasOnkeydown = element.elementHasAttribute('onkeydown');
      const hasOnkeyup = element.elementHasAttribute('onkeyup');

      if (!hasOnkeypress && !hasOnkeydown && !hasOnkeyup) {
        evaluation.verdict = 'failed';
        evaluation.description = `The mouse event attribute doesn't have a keyboard equivalent.`;
        evaluation.resultCode = 'RC3';
      } else {
        const keyPress = element.getElementAttribute('onkeypress');
        const keyDown = element.getElementAttribute('onkeydown');
        const keyUp = element.getElementAttribute('onkeyup');

        if (element.elementHasAttribute('onmousedown')) {
          const event = element.getElementAttribute('onmousedown');

          if (event === keyPress || event === keyDown || event === keyUp) {
            this.fillPassedResult(evaluation);
          } else {
            this.fillWarningResult(evaluation);
          }
        }

        if (element.elementHasAttribute('onmouseup')) {
          const event = element.getElementAttribute('onmouseup');

          if (event === keyPress || event === keyDown || event === keyUp) {
            this.fillPassedResult(evaluation);
          } else {
            this.fillWarningResult(evaluation);
          }
        }

        if (element.elementHasAttribute('onclick')) {
          const event = element.getElementAttribute('onclick');

          if (event === keyPress || event === keyDown || event === keyUp) {
            this.fillPassedResult(evaluation);
          } else {
            this.fillWarningResult(evaluation);
          }
        }

        if (element.elementHasAttribute('onmouseover')) {
          const event = element.getElementAttribute('onmouseover');

          if (event === keyPress || event === keyDown || event === keyUp) {
            this.fillPassedResult(evaluation);
          } else {
            this.fillWarningResult(evaluation);
          }
        }

        if (element.elementHasAttribute('onmouseout')) {
          const event = element.getElementAttribute('onmouseout');

          if (event === keyPress || event === keyDown || event === keyUp) {
            this.fillPassedResult(evaluation);
          } else {
            this.fillWarningResult(evaluation);
          }
        }

        if (element.elementHasAttribute('onmouseenter')) {
          const event = element.getElementAttribute('onmouseenter');

          if (event === keyPress || event === keyDown || event === keyUp) {
            this.fillPassedResult(evaluation);
          } else {
            this.fillWarningResult(evaluation);
          }
        }

        if (element.elementHasAttribute('onmouseleave')) {
          const event = element.getElementAttribute('onmouseleave');

          if (event === keyPress || event === keyDown || event === keyUp) {
            this.fillPassedResult(evaluation);
          } else {
            this.fillWarningResult(evaluation);
          }
        }

        if (element.elementHasAttribute('onmousemove')) {
          const event = element.getElementAttribute('onmousemove');

          if (event === keyPress || event === keyDown || event === keyUp) {
            this.fillPassedResult(evaluation);
          } else {
            this.fillWarningResult(evaluation);
          }
        }

        if (element.elementHasAttribute('ondblclick')) {
          const event = element.getElementAttribute('ondblclick');

          if (event === keyPress || event === keyDown || event === keyUp) {
            this.fillPassedResult(evaluation);
          } else {
            this.fillWarningResult(evaluation);
          }
        }

        if (element.elementHasAttribute('onwheel')) {
          const event = element.getElementAttribute('onwheel');

          if (event === keyPress || event === keyDown || event === keyUp) {
            this.fillPassedResult(evaluation);
          } else {
            this.fillWarningResult(evaluation);
          }
        }
      }

      super.addEvaluationResult(evaluation, element);
    }
  }

  private fillPassedResult(evaluation: WCAGTechniqueResult): void {
    if (evaluation.verdict === '') {
      evaluation.verdict = 'passed';
      evaluation.description = `The mouse event attribute has a keyboard equivalent.`;
      evaluation.resultCode = 'RC1';
    }
  }

  private fillWarningResult(evaluation: WCAGTechniqueResult): void {
    evaluation.verdict = 'warning';
    evaluation.description = `The test target has a keyboard event, but we can't verify if it's equivalent to the mouse event.`;
    evaluation.resultCode = 'RC2';
  }
}

export = QW_WCAG_T6;
