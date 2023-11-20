import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, IsHTMLDocument } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R73 extends AtomicRule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
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
            test.resultCode = 'W1';
            hasLinks = true;
            break;
          }
        }
      }
    }

    if (!hasLinks) {
      test.verdict = 'passed';
      test.resultCode = 'P1';
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
