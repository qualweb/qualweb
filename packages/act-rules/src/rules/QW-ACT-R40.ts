import type { QWElement } from '@packages/qw-element/src';
import { ElementExists, ElementHasTextNode, ElementIsVisible } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Verdict } from '@shared/types';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R40 extends AtomicRule {
  @ElementExists
  @ElementHasTextNode
  @ElementIsVisible
  execute(element: QWElement): void {
    let isApplicable = false;

    let parent: QWElement | null = element;
    while (parent && parent.getElementTagName().toLowerCase() !== 'html') {
      if (parent.getElementTagName().toLowerCase() === 'svg') {
        isApplicable = false;
        break;
      }

      const of = parent.getElementStyleProperty('overflow', null);
      const ofx = parent.getElementStyleProperty('overflow-x', null);
      const ofy = parent.getElementStyleProperty('overflow-y', null);

      if (
        of === 'hidden' ||
        of === 'clip' ||
        ofx === 'hidden' ||
        ofx === 'clip' ||
        ofy === 'hidden' ||
        ofy === 'clip'
      ) {
        isApplicable = true;
      }

      const ariaHidden = parent.getElementAttribute('aria-hidden');
      if (ariaHidden !== null && ariaHidden === 'true') {
        isApplicable = false;
        break;
      }

      parent = parent.getElementParent();
    }

    if (isApplicable) {
      const test = new Test(Verdict.WARNING, undefined, 'W1');
      test.addElement(element);
      this.addTestResult(test);
    }
  }
}

export { QW_ACT_R40 };
