import { ElementExists, IsHTMLDocument } from '@qualweb/lib';
import { CompositeRule } from '../lib/CompositeRule.object';

class QW_ACT_R75 extends CompositeRule {

  @ElementExists
  @IsHTMLDocument
  execute(): void {
    throw new Error('Method not implemented.');
  }
}

export { QW_ACT_R75 };
