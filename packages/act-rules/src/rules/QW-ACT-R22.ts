import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementHasAttribute } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R22 extends AtomicRule {
  @ElementExists
  @ElementHasAttribute('lang')
  execute(element: QWElement): void {
    const test = new Test();

    const lang = (<string>element.getElementAttribute('lang')).toLowerCase();
    if (lang !== '') {
      const subTag = lang.split('-')[0];
      const text = element.getElementOwnText();
      const accessibleName = window.AccessibilityUtils.getAccessibleName(element);

      if (this.isSubTagValid(subTag)) {
        test.verdict = Verdict.PASSED;
        test.resultCode = 'P1';

        test.addElement(element);
        this.addTestResult(test);
      } else if (
        (text && text.trim() !== '') ||
        (accessibleName && accessibleName.trim() !== '') ||
        this.hasChildWithTextOrAccessibleName(element)
      ) {
        test.verdict = Verdict.FAILED;
        test.resultCode = 'F1';

        test.addElement(element);
        this.addTestResult(test);
      }
    }
  }

  private hasChildWithTextOrAccessibleName(element: QWElement): boolean {
    let hasTextOrAccessibleName = false;

    for (const child of element.getElementChildren() || []) {
      if (
        child.getElementAttribute('lang') === null &&
        (window.DomUtils.isElementVisible(child) || window.AccessibilityUtils.isElementInAT(child))
      ) {
        const text = child.getElementOwnText();
        const accessibleName = window.AccessibilityUtils.getAccessibleName(child);
        if ((text && text.trim() !== '') || (accessibleName && accessibleName.trim() !== '')) {
          hasTextOrAccessibleName = true;
        } else {
          hasTextOrAccessibleName = this.hasChildWithTextOrAccessibleName(child);
        }
      }
    }

    return hasTextOrAccessibleName;
  }

  private isSubTagValid(subTag: string): boolean {
    const languages = window.AccessibilityUtils.languages;
    return languages.hasOwnProperty(subTag);
  }
}

export { QW_ACT_R22 };
