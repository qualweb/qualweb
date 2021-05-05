import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, IsHTMLDocument } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R74 extends AtomicRule {
  constructor(rule: ACTRule, locale: any) {
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
      const linksWithAnchors = new Array<typeof window.qwElement>();
      for (const link of links) {
        if (link.elementHasAttribute('href')) {
          const href = (<string>link.getElementAttribute('href')).trim();
          if (href.startsWith('#')) {
            linksWithAnchors.push(link);
          } else if (href.startsWith('/') || href.startsWith('.') || href.startsWith(host)) {
            hasLinks = true;
          }
        }
      }

      if (hasLinks) {
        let nSkipLinks = 0;
        for (const anchor of linksWithAnchors) {
          anchor.focusElement();
          try {
            anchor.click();
          } finally {
          }
          const focusedElement = window.qwPage.getFocusedElement();
          if (focusedElement && (anchor.getElementSelector() !== focusedElement.getElementSelector())) {
            nSkipLinks++;
          }
        }

        if (nSkipLinks > 0) {
          test.verdict = 'warning';
          test.resultCode = 'RC2';
        } else {
          test.verdict = 'warning';
          test.resultCode = 'RC3';
        }
      }
    }

    if (!hasLinks) {
      test.verdict = 'passed';
      test.resultCode = 'RC1';
    }

    test.addElement(element, false);
    super.addTestResult(test);
  }
}

export = QW_ACT_R74;
