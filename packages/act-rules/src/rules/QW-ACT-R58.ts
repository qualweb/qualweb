import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, ElementIsNotHidden, ElementIsVisible } from '../lib/decorator';
import Test from '../lib/Test.object';
@ACTRuleDecorator
class QW_ACT_R58 extends AtomicRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
  }

  @ElementExists
  @ElementIsNotHidden
  @ElementIsVisible
  execute(element: typeof window.qwElement): void {
    const autoPlay = element.getElementProperty('autoplay');

    if (autoPlay) {
      const test = new Test('warning', undefined, 'W1');
      test.addElement(element);
      super.addTestResult(test);
    }
  }
}

export = QW_ACT_R58;
