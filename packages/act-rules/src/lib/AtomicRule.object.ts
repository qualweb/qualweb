import { ACTRule } from '@qualweb/act-rules';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import Rule from './Rule.object';

abstract class AtomicRule extends Rule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  abstract execute(element: QWElement | undefined, page?: QWPage): void;
}

export = AtomicRule;
