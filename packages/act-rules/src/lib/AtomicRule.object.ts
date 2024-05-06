import type { QWElement } from '@packages/qw-element/src';
import { Rule } from './Rule.object';

abstract class AtomicRule extends Rule {
  abstract execute(element?: QWElement): void;
}

export { AtomicRule };
