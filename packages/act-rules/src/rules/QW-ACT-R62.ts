import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R62 extends AtomicRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const diff = element.getElementAttribute('data-qw-act-r62');
    if (diff === null) {
      return;
    }
    if (diff === 'true') {
      const test = new Test('passed', undefined, 'P1');
      test.addElement(element);
      super.addTestResult(test);
    } else {
      const test = new Test('failed', undefined, 'F1');
      test.addElement(element);
      super.addTestResult(test);
    }
  }
}

export = QW_ACT_R62;
