import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, ElementIsImage } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R17 extends AtomicRule {
  constructor(rule: ACTRule, locale: any) {
    super(rule, locale);
  }

  @ElementExists
  @ElementIsImage
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const name = element.getElementTagName();
    const elementInAT = window.AccessibilityUtils.isElementInAT(element);
    const role = window.AccessibilityUtils.getElementRole(element);
    const hidden = window.DomUtils.isElementHidden(element);

    const alt = element.getElementAttribute('alt');

    if (name === 'img' && !hidden && (alt === '' || role === 'presentation' || role === 'none')) {
      test.verdict = 'passed';
      test.resultCode = 'RC1';

      test.addElement(element);
      super.addTestResult(test);
    } else if (elementInAT) {
      const accessibleName = window.AccessibilityUtils.getAccessibleName(element);
      if (accessibleName && accessibleName.trim() !== '') {
        test.verdict = 'passed';
        test.resultCode = 'RC2';
      } else {
        test.verdict = 'failed';
        test.resultCode = 'RC3';
      }

      test.addElement(element, true, false, true);
      super.addTestResult(test);
    }
  }
}

export = QW_ACT_R17;
