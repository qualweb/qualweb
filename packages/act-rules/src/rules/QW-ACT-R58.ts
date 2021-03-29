import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';
@ACTRuleDecorator
class QW_ACT_R58 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const isHidden = window.DomUtils.isElementHidden(element);
    const isVisible = window.DomUtils.isElementVisible(element);
    const autoPlay = element.getElementProperty('autoplay');

    if ((!isHidden && isVisible) || autoPlay) {
      const test = new Test();
      
      test.verdict = 'warning';
      test.description = 'Check if the test target audio has text-alternative.';
      test.resultCode = 'RC1';

      test.addElement(element);
      super.addTestResult(test);
    } 
  }
}

export = QW_ACT_R58;
