import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R17 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const name = element.getElementTagName();
    const elementInAT = window.AccessibilityUtils.isElementInAT(element);
    const role = window.AccessibilityUtils.getElementRole(element);
    const hidden = window.DomUtils.isElementHidden(element);

    if (name === 'img') {
      const alt = element.getElementAttribute('alt');

      if (!hidden && (alt === '' || role === 'presentation' || role === 'none')) {
        test.verdict = 'passed';
        test.description = `The test target is decorative.`;
        test.resultCode = 'RC1';
        
        test.addElement(element)
        super.addTestResult(test);
      } else if (elementInAT) {
        const accessibleName = window.AccessibilityUtils.getAccessibleName(element);
        if (accessibleName && accessibleName.trim() !== '') {
          test.verdict = 'passed';
          test.description = `The test target has an accessible name.`;
          test.resultCode = 'RC3';
        } else {
          test.verdict = 'failed';
          test.description = `The test target doesn't have an accessible name.`;
          test.resultCode = 'RC4';
        }

        test.addElement(element, true, false, true)
        super.addTestResult(test);
      }
    } else if (name !== 'svg' && role === 'img') {
      if (elementInAT) {
        const accessibleName = window.AccessibilityUtils.getAccessibleName(element);
        if (accessibleName) {
          test.verdict = 'passed';
          test.description = `The test target has an accessible name.`;
          test.resultCode = 'RC6';
        } else {
          test.verdict = 'failed';
          test.description = `The test target doesn't have an accessible name.`;
          test.resultCode = 'RC7';
        }

        test.addElement(element, true, false, true)
        super.addTestResult(test);
      }
    }
  }
}

export = QW_ACT_R17;
