import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T33 extends Technique {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();
    const parent = this.getCorrectParent(element);
    let isValidParent = false;
    if (parent) {
      const parentRole = window.AccessibilityUtils.getElementRole(parent);
      const parentName = parent.getElementTagName();

      if (
        parentName === 'dl' &&
        ((parentRole && ['presentation', 'none', 'list'].includes(parentRole)) || !parentRole)
      ) {
        isValidParent = true;
      }
    }
    if (isValidParent) {
      test.verdict = 'passed';
      test.resultCode = 'P1';
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F1';
    }
    test.addElement(element);
    this.addTestResult(test);
  }
  getCorrectParent(element: QWElement) {
    let parent = element.getElementParent();
    if (parent) {
      const parentRole = window.AccessibilityUtils.getElementRole(parent);
      const parentName = parent.getElementTagName();
      if (parentName === 'div' && ['presentation', 'none', null].includes(parentRole))
        parent = parent.getElementParent();
    }
    return parent;
  }
}

export { QW_WCAG_T33 };
