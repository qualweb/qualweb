import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, ElementIsVisible } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R52 extends AtomicRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
  }

  @ElementExists
  @ElementIsVisible
  execute(element: typeof window.qwElement): void {
    const track = element.getElement('track[kind="descriptions"]');
    const duration = parseInt(element.getElementProperty('duration'));
    const hasSoundTrack = window.DomUtils.videoElementHasAudio(element);
    const hasPuppeteerApplicableData = duration > 0 && !hasSoundTrack;

    if (track) {
      const test = new Test('warning');

      if (!(duration >= 0 && hasSoundTrack)) {
        test.resultCode = 'W1';
        test.addElement(element);
        super.addTestResult(test);
      } else if (hasPuppeteerApplicableData) {
        test.resultCode = 'W2';
        test.addElement(element);
        super.addTestResult(test);
      }
    }
  }
}

export = QW_ACT_R52;
