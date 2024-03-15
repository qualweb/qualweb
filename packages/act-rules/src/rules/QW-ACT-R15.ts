import { ElementExists } from '@qualweb/lib';
import { CompositeRule } from '../lib/CompositeRule.object';

class QW_ACT_R15 extends CompositeRule {

  @ElementExists
  execute(): void {
    throw new Error('Method not implemented.');
  }
}

export { QW_ACT_R15 };
