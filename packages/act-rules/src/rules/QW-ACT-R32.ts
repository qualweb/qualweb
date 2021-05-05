import { ACTRule } from '@qualweb/act-rules';
import CompositeRule from '../lib/CompositeRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';

@ACTRuleDecorator
class QW_ACT_R32 extends CompositeRule {
  constructor(rule: ACTRule, locale: any) {
    super(rule, locale);
  }

  @ElementExists
  execute(): void {
    throw new Error('Method not implemented.');
  }
}

export = QW_ACT_R32;
