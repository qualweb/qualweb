import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R50 extends AtomicRule {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const autoplay = element.getElementProperty('autoplay') === "true";
    const paused = element.getElementAttribute('paused') === "true";
    const muted = element.getElementProperty('muted') === "true";
    const controls = (element.getElementProperty('controls') === "true") || this.hasPlayOrMuteButton(element); 
    const duration = parseInt(element.getElementProperty('duration'));
    const hasSoundTrack = window.DomUtils.videoElementHasAudio(element);
    const isAudioElement = element.getElementTagName() === 'audio';
    const hasPuppeteerApplicableData = duration > 3 && (hasSoundTrack || isAudioElement);

    if (!(!autoplay || paused || muted || !hasPuppeteerApplicableData)) {
      if (controls) {
        test.verdict = Verdict.PASSED;
        test.resultCode = 'P1';
      } else {
        test.verdict = Verdict.FAILED;
        test.resultCode = 'F1';
      }
    } else {
      test.verdict = Verdict.INAPPLICABLE;
      test.resultCode = 'I1';
    }

    test.addElement(element);
    this.addTestResult(test);
  }

  // determines if is there a button element in the page with the label or accessible name equal to "play", "pause", "mute" or "unmute"
  private hasPlayOrMuteButton(element: QWElement): boolean {
    const labels: string[] = ['play', 'pause', 'mute', 'unmute'];
    let rootElement = element;
    while (rootElement && rootElement.getElementTagName() !== 'body') {
      rootElement = rootElement.getElementParent()!;
    }
    if (!rootElement) {
      return false;
    }
    const buttons = rootElement.getElements('button');
    for (const button of buttons || []) {
      if (button && window.DomUtils.isElementVisible(button) && window.AccessibilityUtils.isElementInAT(button)) {
        const accessibleName = window.AccessibilityUtils.getAccessibleName(button);
        const buttonLabel = window.DomUtils.getTrimmedText(button);
        if (accessibleName && labels.includes(accessibleName.toLowerCase())) {
          return true;
        } else if (buttonLabel && labels.includes(buttonLabel.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  }
}

export { QW_ACT_R50 };
