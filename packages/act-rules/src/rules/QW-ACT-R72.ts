import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R72 extends AtomicRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
  }

  execute(): void {
    const test = new Test();

    const elementList = window.qwPage.getElements('*');
    //mudar para find
    const inSequentialFocusList = elementList.filter((element: typeof window.qwElement) => {
      return window.AccessibilityUtils.isPartOfSequentialFocusNavigation(element);
    });

    if (inSequentialFocusList.length > 0) {
      const focused = window.qwPage.getFocusedElement();

      // is keyboard actionable
      if (
        focused &&
        (!window.AccessibilityUtils.isPartOfSequentialFocusNavigation(focused) ||
          !window.DomUtils.isElementVisible(focused))
      ) {
        // not checking if it is possible to fire an event at the element with the keyboard
        test.verdict = 'failed';
        test.resultCode = 'F1';

        test.addElement(focused, false);
      } else if (focused && !window.AccessibilityUtils.isElementInAT(focused)) {
        test.verdict = 'failed';
        test.resultCode = 'F2';

        test.addElement(focused, false);
      } else if (focused && window.AccessibilityUtils.getElementRole(focused) !== 'link') {
        test.verdict = 'failed';
        test.resultCode = 'F3';

        test.addElement(focused, false);
      } else if (focused?.getElementAttribute('href')) {
        const destination = focused.getElementAttribute('href')?.trim();
        if (destination && this.checkDestination(destination)) {
          // only checking that it has an url that starts with # -- other ways of linking to the same page are not considered

          if (window.qwPage.getElementByID(destination.split('#')[1])) {
            test.verdict = 'warning';
            test.resultCode = 'W1';

            test.addElement(focused, false);
          } else {
            test.verdict = 'failed';
            test.resultCode = 'F4';

            test.addElement(focused, false);
          }
        } else {
          test.verdict = 'failed';
          test.resultCode = 'F4';

          test.addElement(focused, false);
        }
      } else {
        test.verdict = 'warning';
        test.resultCode = 'W2';

        if (focused) {
          test.addElement(focused);
        }
      }
    } else {
      test.verdict = 'failed';
      test.resultCode = 'F5';
    }

    super.addTestResult(test);
  }

  private checkDestination(destination: string): boolean {
    const url = window.qwPage.getURL();
    return (
      destination.startsWith('#') ||
      destination.startsWith('/#') ||
      destination.startsWith(url + '#') ||
      destination.startsWith(url + '/#')
    );
  }
}

export = QW_ACT_R72;
