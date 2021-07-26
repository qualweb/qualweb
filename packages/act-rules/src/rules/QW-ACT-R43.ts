import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, ElementIsVisible } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R43 extends AtomicRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
  }

  @ElementExists
  @ElementIsVisible
  execute(element: typeof window.qwElement): void {
    if (element.getElementTagName().toLowerCase() === 'iframe') {
      return;
    }

    let hasVisibleChildren = false;
    let isApplicable = false;
    for (const child of element.getElementChildren()) {
      if (window.DomUtils.isElementVisible(child)) {
        hasVisibleChildren = true;
        break;
      }
    }
    if (hasVisibleChildren) {
      const of = element.getElementStyleProperty('overflow', null);
      const ofx = element.getElementStyleProperty('overflow-x', null);
      const ofy = element.getElementStyleProperty('overflow-y', null);

      if (
        of === 'auto' ||
        of === 'clip' ||
        of === 'scroll' ||
        ofx === 'auto' ||
        ofx === 'clip' ||
        ofx === 'scroll' ||
        ofy === 'auto' ||
        ofy === 'clip' ||
        ofy === 'scroll'
      ) {
        const scrollWidth = element.getElementProperty('scrollWidth');
        const clientWidth = element.getElementProperty('clientWidth');

        const differenceWidth = parseInt(scrollWidth) - parseInt(clientWidth);

        const scrollHeight = element.getElementProperty('scrollHeight');
        const clientHeight = element.getElementProperty('clientHeight');

        const differenceHeight = parseInt(scrollHeight) - parseInt(clientHeight);

        const paddingLeft = element.getElementStyleProperty('padding-left', null);
        const paddingRight = element.getElementStyleProperty('padding-right', null);

        const paddingTop = element.getElementStyleProperty('padding-top', null);
        const paddingBottom = element.getElementStyleProperty('padding-bottom', null);

        isApplicable =
          differenceWidth > parseInt(paddingLeft) ||
          differenceWidth > parseInt(paddingRight) ||
          differenceHeight > parseInt(paddingTop) ||
          differenceHeight > parseInt(paddingBottom);
      }
    }

    if (isApplicable) {
      const test = new Test();

      if (this.isInSequentialFocusNavigation(element)) {
        test.verdict = 'passed';
        test.resultCode = 'P1';
      } else {
        test.verdict = 'failed';
        test.resultCode = 'F1';
      }

      test.addElement(element);
      super.addTestResult(test);
    }
  }

  private isInSequentialFocusNavigation(element: typeof window.qwElement): boolean {
    if (window.AccessibilityUtils.isPartOfSequentialFocusNavigation(element)) {
      return true;
    } else {
      let result = false;
      for (const child of element.getElementChildren()) {
        if (window.AccessibilityUtils.isPartOfSequentialFocusNavigation(child)) {
          return true;
        } else {
          result = result || this.isInSequentialFocusNavigation(child);
        }
      }
      return result;
    }
  }
}

export = QW_ACT_R43;
