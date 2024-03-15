import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, Test } from '@qualweb/lib';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R50 extends AtomicRule {

  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const autoplay = element.getElementProperty('autoplay');
    const paused = element.getElementAttribute('paused');
    const muted = element.getElementProperty('muted');
    const srcAttr = element.getElementAttribute('src');
    const childSrc = element.getElements('source[src]');
    const controls = element.getElementProperty('controls') || this.hasPlayOrMuteButton(element);
    const duration = parseInt(element.getElementProperty('duration'));
    const hasSoundTrack = window.DomUtils.videoElementHasAudio(element);
    const isAudioElement = element.getElementTagName() === 'audio';
    const hasPuppeteerApplicableData = duration > 3 && (hasSoundTrack || isAudioElement);
    // const src = new Array<string | null>();

    // if (childSrc.length > 0) {
    //   for (const child of childSrc || []) {
    //     src.push(child.getElementAttribute('src'));
    //   }
    // } else {
    //   src.push(srcAttr);
    // }

    if (!(!autoplay || paused || muted || (!srcAttr && childSrc.length === 0))) {
      if (!(duration > 0 && (hasSoundTrack || isAudioElement))) {
        test.verdict = 'inapplicable';
        test.resultCode = 'I1';
      } else if (hasPuppeteerApplicableData) {
        if (controls) {
          test.verdict = 'passed';
          test.resultCode = 'P1';
        } else {
          test.verdict = 'failed';
          test.resultCode = 'F1';
        }
      }

      test.addElement(element);
      this.addTestResult(test);
    }
  }

  // determines if is there a button element in the page with the label or accessible name equal to "play", "pause", "mute" or "unmute"
  private hasPlayOrMuteButton(element: QWElement): boolean {
    const labels: string[] = ['play', 'pause', 'mute', 'unmute'];
    let rootElement = element;
    while (rootElement && rootElement.getElementTagName() !== 'body') {
      rootElement = rootElement.getElementParent()!;
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
