import Rule from '../lib/CompositeRule.object';
import { ACTRuleDecorator, ElementExists } from "../lib/decorator";

@ACTRuleDecorator
class QW_ACT_R32 extends Rule {
  @ElementExists
  execute(): void {
    throw new Error("Method not implemented.");
  }

  constructor(rule?: any) {
    super(rule);
  }

}

export = QW_ACT_R32;