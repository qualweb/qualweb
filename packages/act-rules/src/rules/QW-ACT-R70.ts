import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, ElementHasNegativeTabIndex } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R70 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  @ElementHasNegativeTabIndex
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    if (!window.DomUtils.isElementVisible(element)) {
      test.verdict = 'passed';
      test.description =
        ' The nested browsing context does not include elements that are visible and part of the sequential focus navigation.';
      test.resultCode = 'RC1';

      test.addElement(element);
    } else {
      const elementList = window.qwPage.getElements('*', undefined);
      const inSequentialFocusList = elementList.filter((elem) => {
        return (
          window.AccessibilityUtils.isPartOfSequentialFocusNavigation(elem) && window.DomUtils.isElementVisible(elem)
        );
      });

      if (inSequentialFocusList.length === 0) {
        test.verdict = 'passed';
        test.description =
          ' The nested browsing context does not include elements that are visible and part of the sequential focus navigation.';
        test.resultCode = 'RC1';

        test.addElement(element);
      } else {
        test.verdict = 'failed';
        test.description =
          'The nested browsing context includes elements that are visible and part of the sequential focus navigation.';
        test.resultCode = 'RC2';

        test.addElement(element, false);
      }
    }

    super.addTestResult(test);
  }
}

export = QW_ACT_R70;
