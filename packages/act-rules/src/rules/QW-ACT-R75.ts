import Rule from '../lib/CompositeRule.object';
import { ACTRuleDecorator, ElementExists, IsHTMLDocument } from '../lib/decorator';

@ACTRuleDecorator
class QW_ACT_R75 extends Rule {
  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  @IsHTMLDocument
  execute(): void {
    throw new Error('Method not implemented.');
  }
}

export = QW_ACT_R75;
