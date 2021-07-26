import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import CompositeRule from '../lib/CompositeRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';

@ACTRuleDecorator
class QW_ACT_R31 extends CompositeRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
  }

  @ElementExists
  execute(): void {
    throw new Error('Method not implemented.');
  }
}

export = QW_ACT_R31;
