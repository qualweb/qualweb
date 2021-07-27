import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import Rule from './Rule.object';

abstract class AtomicRule extends Rule {
  constructor(rule: ACTRule, locales: Translate) {
    super(rule, locales);
  }

  abstract execute(element: typeof window.qwElement | undefined): void;
}

export = AtomicRule;
