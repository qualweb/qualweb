import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R52 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const track = element.getElement('track[kind="descriptions"]');
    const isVisible = window.DomUtils.isElementVisible(element);
    const duration = parseInt(element.getElementProperty('duration'));
    const hasSoundTrack = window.DomUtils.videoElementHasAudio(element);
    const hasPuppeteerApplicableData = duration > 0 && !hasSoundTrack;

    if (isVisible && track) {
      const test = new Test();
      
      if (!(duration >= 0 && hasSoundTrack)) {
        test.verdict = 'warning';
        test.description = 'Cant collect data from the test target.';
        test.resultCode = 'RC2';

        test.addElement(element);
        super.addTestResult(test);
      } else if (hasPuppeteerApplicableData) {
        test.verdict = 'warning';
        test.description = `Check if visual content has an accessible alternative.`;
        test.resultCode = 'RC3';

        test.addElement(element);
        super.addTestResult(test);
      }
    }
  }
}

export = QW_ACT_R52;
