import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R50 extends AtomicRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
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
    const src = new Array<string | null>();

    if (childSrc.length > 0) {
      for (const child of childSrc || []) {
        src.push(child.getElementAttribute('src'));
      }
    } else {
      src.push(srcAttr);
    }

    if (!(!autoplay || paused || muted || (!srcAttr && childSrc.length === 0))) {
      if (!(duration >= 0 && hasSoundTrack)) {
        test.verdict = 'warning';
        test.resultCode = 'W1';
      } else if (hasPuppeteerApplicableData) {
        if (controls) {
          test.verdict = 'passed';
          test.resultCode = 'P1';
        } else {
          test.verdict = 'warning';
          test.resultCode = 'W2';
        }
      }

      test.addElement(element);
      super.addTestResult(test);
    }
  }
}

export = QW_ACT_R50;
