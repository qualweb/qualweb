import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, IsHTMLDocument } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R63 extends AtomicRule {
  constructor(rule: ACTRule, locale: any) {
    super(rule, locale);
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
            test.resultCode = 'RC2';
            hasLinks = true;
            break;
          }
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

export = QW_ACT_R63;
