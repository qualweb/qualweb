import { ACTRule } from '@qualweb/act-rules';
import CompositeRule from '../lib/CompositeRule.object';
import { ACTRuleDecorator, ElementExists, IsHTMLDocument } from '../lib/decorator';

@ACTRuleDecorator
class QW_ACT_R75 extends CompositeRule {
  constructor(rule: ACTRule, locale: any) {
    super(rule, locale);
  }

  @ElementExists
  @IsHTMLDocument
  execute(): void {
    throw new Error('Method not implemented.');
  }
}

export = QW_ACT_R75;
