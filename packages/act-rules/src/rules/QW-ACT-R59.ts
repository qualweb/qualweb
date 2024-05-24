import type { QWElement } from '@packages/qw-element/src';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Verdict } from '@shared/types';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R59 extends AtomicRule {
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

export { QW_ACT_R59 };
