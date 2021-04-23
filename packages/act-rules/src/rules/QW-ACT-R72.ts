import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R72 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
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
      if (focused && (
        !window.AccessibilityUtils.isPartOfSequentialFocusNavigation(focused) ||
        !window.DomUtils.isElementVisible(focused))
      ) {
        // not checking if it is possible to fire an event at the element with the keyboard
        test.verdict = 'failed';
        test.description = 'The first focusable element is not keyboard actionable';
        test.resultCode = 'RC2';

        test.addElement(focused, false);
      } else if (focused && !window.AccessibilityUtils.isElementInAT(focused)) {
        test.verdict = 'failed';
        test.description = 'The first focusable element is not in the accessibility tree';
        test.resultCode = 'RC3';

        test.addElement(focused, false);
      } else if (focused && window.AccessibilityUtils.getElementRole(focused) !== 'link') {
        test.verdict = 'failed';
        test.description = 'The first focusable element does not have the role of link';
        test.resultCode = 'RC4';

        test.addElement(focused, false);
      } else if (focused?.getElementAttribute('href')) {
        const destination = focused.getElementAttribute('href')?.trim();
        if (destination && destination.startsWith('#')) {
          // only checking that it has an url that starts with # -- other ways of linking to the same page are not considered
          if (window.qwPage.getElementByID(destination.substring(1))) {
            test.verdict = 'warning';
            test.description =
              'Check that the first focusable element has an accessible name that communicates that it skips content';
            test.resultCode = 'RC7';

            test.addElement(focused, false);
          } else {
            test.verdict = 'failed';
            test.description = 'The first focusable element does not skip to the main content';
            test.resultCode = 'RC6';

            test.addElement(focused, false);
          }
        } else {
          test.verdict = 'failed';
          test.description = 'The first focusable element does not skip to the main content';
          test.resultCode = 'RC5';

          test.addElement(focused, false);
        }
      } else {
        test.verdict = 'warning';
        test.description =
          'Check that the first focusable element skips to the main content and its accessible name communicates so';
        test.resultCode = 'RC8';
        
        if (focused) {
          test.addElement(focused);
        }
      }
    } else {
      test.verdict = 'failed';
      test.description = 'The page does not have focusable elements';
      test.resultCode = 'RC1';
    }

    super.addTestResult(test);
  }
}

export = QW_ACT_R72;
