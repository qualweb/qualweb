import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, ElementIsNotInert, ElementIsVisible } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R70 extends AtomicRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
  }

  @ElementExists
  @ElementIsNotInert
  @ElementIsVisible
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const elementList = window.qwPage.getElements('*', undefined);
    const childrenInSequentialFocusList = elementList.filter((elem) => {
      return (
        window.AccessibilityUtils.isPartOfSequentialFocusNavigation(elem) && window.DomUtils.isElementVisible(elem)
      );
    });
    if (childrenInSequentialFocusList.length === 0) {
      test.verdict = 'inapplicable';
      test.resultCode = 'I1';
      test.addElement(element);
    } else {
      const tabindex = (<typeof window.qwElement>arguments[0]).getElementAttribute('tabindex');
      if (tabindex && parseInt(tabindex) <= -1) {
        test.verdict = 'failed';
        test.resultCode = 'F1';
        test.addElement(element, false);
      } else {
        test.verdict = 'passed';
        test.resultCode = 'P1';
        test.addElement(element);
      }
    }

    super.addTestResult(test);
  }
}

export = QW_ACT_R70;
