import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R50 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const autoplay = element.getElementProperty('autoplay');
    const paused = element.getElementAttribute('paused');
    const muted = element.getElementProperty('muted');
    const srcAttr = element.getElementAttribute('src');
    const childSrc = element.getElements('source[src]');
    const controls = element.getElementProperty('controls');
    const duration = parseInt(element.getElementProperty('duration'));
    const hasSoundTrack = window.DomUtils.videoElementHasAudio(element);
    const hasPuppeteerApplicableData = duration > 3 && hasSoundTrack;
    const src = new Array<any>();

    if (childSrc.length > 0) {
      for (const child of childSrc || []) {
        src.push(child.getElementAttribute('src'));
      }
    } else {
      src.push(srcAttr);
    }

    if (autoplay && !paused && !muted && (srcAttr && childSrc.length !== 0)) {
      if (!(duration >= 0 && hasSoundTrack)) {
        test.verdict = 'warning';
        test.description = `Can't collect data from the test target element.`;
        test.resultCode = 'RC2';
      } else if (hasPuppeteerApplicableData) {
        if (controls) {
          test.verdict = 'passed';
          test.description = 'The test target has a visible control mechanism.';
          test.resultCode = 'RC1';
        } else {
          test.verdict = 'warning';
          test.description = 'Check if test target has a visible control mechanism.';
          test.resultCode = 'RC3';
        }
      }

      test.addElement(element);
      super.addTestResult(test);
    }
  }
}

export = QW_ACT_R50;
