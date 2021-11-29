import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import {
  ACTRuleDecorator,
  ElementExists,
  ElementHasAttribute
} from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R22 extends AtomicRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
  }

  @ElementExists
  @ElementHasAttribute('lang')
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const lang = (<string>element.getElementAttribute('lang')).toLowerCase();
    if (lang !== '') {
      const subTag = lang.split('-')[0];
      const text = element.getElementOwnText();
      const accessibleName = window.AccessibilityUtils.getAccessibleName(element);

      if (this.isSubTagValid(subTag)) {
        test.verdict = 'passed';
        test.resultCode = 'P1';

        test.addElement(element);
        super.addTestResult(test);
      } else if (
        (text && text.trim() !== '') ||
        (accessibleName && accessibleName.trim() !== '') ||
        this.hasChildWithTextOrAccessibleName(element)
      ) {
        test.verdict = 'failed';
        test.resultCode = 'F1';

        test.addElement(element);
        super.addTestResult(test);
      }
    }
  }

  private hasChildWithTextOrAccessibleName(element: typeof window.qwElement): boolean {
    let hasTextOrAccessibleName = false;

    for (const child of element.getElementChildren() || []) {
      if (child.getElementAttribute('lang') === null && (window.DomUtils.isElementVisible(child) || window.AccessibilityUtils.isElementInAT(child))) {
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

export = QW_ACT_R22;
