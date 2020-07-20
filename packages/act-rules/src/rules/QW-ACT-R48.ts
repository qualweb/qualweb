'use strict';

import Rule from '../lib/CompositeRule.object';
import { ACTRuleDecorator } from "../lib/decorator";
import {QWElement} from "@qualweb/qw-element";
import { ACTRule } from '@qualweb/act-rules';


@ACTRuleDecorator
class QW_ACT_R48 extends Rule {
  execute(element: QWElement, rules: ACTRule[]): void {
    throw new Error("Method not implemented.");
  }

  constructor(rule?: any) {
    super(rule);
  }

}

export = QW_ACT_R48;
