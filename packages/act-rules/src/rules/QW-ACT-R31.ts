import { ElementExists } from '@qualweb/common';
import { CompositeRule } from '../lib/CompositeRule.object';

class QW_ACT_R31 extends CompositeRule {
  @ElementExists
  execute(): void {
    throw new Error('Method not implemented.');
  }
}

export { QW_ACT_R31 };
