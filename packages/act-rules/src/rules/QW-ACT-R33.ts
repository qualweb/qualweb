import type { QWElement } from '@qualweb/qw-element';
import { ElementExists } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R33 extends AtomicRule {
  @ElementExists
  execute(element: QWElement): void {
    const roles = window.AccessibilityUtils.roles;

    const test = new Test();

    const explicitRole = window.AccessibilityUtils.getElementValidExplicitRole(element);
    const implicitRole = window.AccessibilityUtils.getImplicitRole(element, '');
    const isInAT = window.AccessibilityUtils.isElementInAT(element);
    const isValidRole = window.AccessibilityUtils.elementHasValidRole(element);
    if (
      explicitRole !== null &&
      isValidRole &&
      explicitRole !== implicitRole &&
      isInAT &&
      roles[explicitRole]['requiredContextRole'] !== ''
    ) {
      const requiredContextRole = roles[explicitRole]['requiredContextRole'];
      const id = element.getElementAttribute('id');

      const ariaOwns = window.qwPage.getElement('[aria-owns' + `~="${id}"]`, element);

      if (ariaOwns !== null) {
        const ariaOwnsRole = window.AccessibilityUtils.getElementRole(ariaOwns);
        if (ariaOwnsRole && requiredContextRole.includes(ariaOwnsRole)) {
          test.verdict = Verdict.PASSED;
          test.resultCode = 'P1';
        } else {
          test.verdict = Verdict.FAILED;
          test.resultCode = 'F1';
        }
      } else if (this.isElementADescendantOf(element, <string[]>requiredContextRole)) {
        test.verdict = Verdict.PASSED;
        test.resultCode = 'P1';
      } else {
        test.verdict = Verdict.FAILED;
        test.resultCode = 'F1';
      }

      test.addElement(element);
      this.addTestResult(test);
    }
  }

  private isElementADescendantOf(element: QWElement, roles: string[]): boolean {
    let parent = element.getElementParent();
    if (!parent) {
      const documentSelector = element.getElementAttribute('_documentSelector');
      if (!!documentSelector && !documentSelector.includes('iframe')) {
        parent = window.qwPage.getElement(documentSelector);
      }
    }
    let result = false;
    let sameRole = false;

    if (parent !== null) {
      const parentRole = window.AccessibilityUtils.getElementRole(parent);
      if (parentRole !== null) {
        sameRole = roles.includes(parentRole);
      }
      result = sameRole;
      if (parentRole === null || parentRole === 'presentation' || parentRole === 'none') {
        return this.isElementADescendantOf(parent, roles);
      } else {
        return result;
      }
    } else {
      return result;
    }
  }
}

export { QW_ACT_R33 };
