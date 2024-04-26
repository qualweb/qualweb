import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R58 extends AtomicRule {
  @ElementExists
  execute(element: QWElement): void {
    const autoPlay = element.getElementProperty('autoplay');
    const controls = element.getElementProperty('controls');

    if (autoPlay || (controls && window.DomUtils.isElementVisible(element))) {
      const test = new Test('warning', undefined, 'W1');
      test.addElement(element);
      this.addTestResult(test);
    }
  }
}

export { QW_ACT_R58 };
