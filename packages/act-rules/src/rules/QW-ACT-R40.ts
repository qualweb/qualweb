import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R40 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    if (element.elementHasTextNode()) {
      if (window.DomUtils.isElementVisible(element)) {
        let isApplicable = false;

        let parent: typeof window.qwElement | null = element;
        while (parent && parent.getElementTagName().toLowerCase() !== 'html') {
          if (parent.getElementTagName().toLowerCase() === 'svg') {
            isApplicable = false;
            break;
          }

          const of = parent.getElementStyleProperty('overflow', null);
          const ofx = parent.getElementStyleProperty('overflow-x', null);
          const ofy = parent.getElementStyleProperty('overflow-y', null);

          if (
            of === 'hidden' ||
            of === 'clip' ||
            ofx === 'hidden' ||
            ofx === 'clip' ||
            ofy === 'hidden' ||
            ofy === 'clip'
          ) {
            isApplicable = true;
          }

          const ariaHidden = parent.getElementAttribute('aria-hidden');
          if (ariaHidden !== null && ariaHidden === 'true') {
            isApplicable = false;
            break;
          }

          parent = parent.getElementParent();
        }

        if (isApplicable) {
          const test = new Test();

          test.verdict = 'warning';
          test.description = 'Check if each ancestor og the text node is not clipped by overflow';
          test.resultCode = 'RC1';

          test.addElement(element);
          super.addTestResult(test);
        }
      }
    }
  }
}

export = QW_ACT_R40;
