import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@qualweb/common';
import { Test } from '@qualweb/common';
import { Verdict } from '@qualweb/common';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R58 extends AtomicRule {
  @ElementExists
  execute(element: QWElement): void {
    const autoPlay = element.getElementProperty('autoplay');
    const controls = element.getElementProperty('controls');

    if (autoPlay || (controls && window.DomUtils.isElementVisible(element))) {
      const test = new Test(Verdict.WARNING, undefined, 'W1');
      test.addElement(element);
      this.addTestResult(test);
    }
  }
}

export { QW_ACT_R58 };
