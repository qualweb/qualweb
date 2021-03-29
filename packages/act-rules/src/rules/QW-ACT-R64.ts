import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, IsHTMLDocument } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R64 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @IsHTMLDocument
  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    let hasLinks = false;
    const links = element.getElements('a');
    if (links) {
      const host = location.hostname;
      for (const link of links) {
        if (link.elementHasAttribute('href')) {
          const href = (<string>link.getElementAttribute('href')).trim();
          if (!href.startsWith('#') && (href.startsWith('/') || href.startsWith('.') || href.startsWith(host))) {
            test.verdict = 'warning';
            test.description = `
              Check either there is no non-repeated content after repeated content or there exists an element for which all the following are true:
               - the element is non-repeated content after repeated content; and
               - the element has a semantic role of heading; and
               - the element is visible; and
               - the element is included in the accessibility tree.
            `;
            test.resultCode = 'RC2';
            hasLinks = true;
            break;
          }
        }
      }
    }

    if (!hasLinks) {
      test.verdict = 'passed';
      test.description = `The page doesn't have repeated content.`;
      test.resultCode = 'RC1';
    }

    test.addElement(element, false);
    super.addTestResult(test);
  }
}

export = QW_ACT_R64;
