import type { QWElement } from '@qualweb/qw-element';
import { Rule } from './Rule.object';

abstract class AtomicRule extends Rule {
  abstract execute(element?: QWElement): void;
}

export { AtomicRule };
