import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R49 extends AtomicRule {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    const autoplay = element.getElementProperty('autoplay');
    const paused = element.getElementAttribute('paused');
    const muted = element.getElementProperty('muted');
    const srcAttr = element.getElementAttribute('src');
    const childSrc = element.getElements('source[src]');
    const duration = parseInt(element.getElementProperty('duration'));
    const hasSoundTrack = window.DomUtils.videoElementHasAudio(element);
    const isAudioElement = element.getElementTagName() === 'audio';
    const hasPuppeteerApplicableData = duration > 3 && (hasSoundTrack || isAudioElement);
    const src = new Array<string | null>();

    if (childSrc.length > 0) {
      for (const child of childSrc || []) {
        src.push(child.getElementAttribute('src'));
      }
    } else {
      src.push(srcAttr);
    }

    if (!(!autoplay || paused || muted || (!srcAttr && childSrc.length === 0))) {
      if (!(duration >= 0 && (hasSoundTrack || isAudioElement))) {
        test.verdict = Verdict.INAPPLICABLE;
        test.resultCode = 'I1';
      } else if (hasPuppeteerApplicableData) {
        if (this.srcTimeIsLessThanThree(src, duration)) {
          test.verdict = Verdict.PASSED;
          test.resultCode = 'P1';
        } else {
          test.verdict = Verdict.FAILED;
          test.resultCode = 'F1';
        }
      }

      test.addElement(element);
      this.addTestResult(test);
    }
  }

  private srcTimeIsLessThanThree(src: any[], duration: number): boolean {
    let result = false;
    for (const child of src || []) {
      if (child) {
        const values = String(child).split('#t=');
        if (values.length > 1) {
          const separatedValues = values[1].split(',');
          const value1 = Number(separatedValues[0]);
          const value2 = Number(separatedValues[1]);

          if (value1 && value2) {
            result = Math.abs(value1 - value2) <= 3;
          } else if (value1) {
            result = Math.abs(duration - value1) <= 3;
          }
        }
      }
    }
    return result;
  }
}

export { QW_ACT_R49 };
