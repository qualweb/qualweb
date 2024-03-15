import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementIsVisible, Test } from '@qualweb/lib';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R56 extends AtomicRule {

  @ElementExists
  @ElementIsVisible
  execute(element: QWElement): void {
    const duration = parseInt(element.getElementProperty('duration'));
    const hasSoundTrack = window.DomUtils.videoElementHasAudio(element);
    const hasPuppeteerApplicableData = duration > 0 && hasSoundTrack;

    const test = new Test('warning');

    if (!(duration >= 0 && hasSoundTrack)) {
      test.resultCode = 'W1';
      test.addElement(element);
      this.addTestResult(test);
    } else if (hasPuppeteerApplicableData) {
      test.resultCode = 'W2';
      test.addElement(element);
      this.addTestResult(test);
    }
  }
}

export { QW_ACT_R56 };
