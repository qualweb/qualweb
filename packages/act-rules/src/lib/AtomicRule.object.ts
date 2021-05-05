import { ACTRule } from '@qualweb/act-rules';
import Rule from './Rule.object';

abstract class AtomicRule extends Rule {
  constructor(rule: ACTRule, locales: { translate: any; fallback: any; }) {
    super(rule, locales);
  }

  abstract execute(element: typeof window.qwElement | undefined): void;
}

export = AtomicRule;
