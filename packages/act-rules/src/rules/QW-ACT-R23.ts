import Rule from '../lib/CompositeRule.object';
import { ACTRuleDecorator, ElementExists } from "../lib/decorator";
import {QWElement} from "@qualweb/qw-element";
import { ACTRule } from '@qualweb/act-rules';


@ACTRuleDecorator
class QW_ACT_R23 extends Rule {
  @ElementExists
  execute(element: QWElement, rules: ACTRule[]): void {
    throw new Error("Method not implemented.");
  }

  constructor(rule?: any) {
    super(rule);
  }

}

export = QW_ACT_R23;
