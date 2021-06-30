import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, IsHTMLDocument } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R73 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  @IsHTMLDocument
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    let hasLinks = false;
    const links = element.getElements('a');
    if (links) {
      const host = location.hostname;
      for (const link of links) {
        if (link.elementHasAttribute('href')) {
          const href = link.getElementAttribute('href')?.trim();
          if (
            href &&
            !this.checkDestination(href) &&
            (href.startsWith('/') || href.startsWith('.') || href.startsWith(host))
          ) {
            test.verdict = 'warning';
            test.description = `
              For each block of repeated content in each test target, which is before (in the flat tree) at least one node of non-repeated content after repeated content, all the following are true:
               - there exists an instrument to make all nodes in this block not visible; and
               - there exists an instrument to remove all nodes in this block from the accessibility tree.
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

export = QW_ACT_R73;
