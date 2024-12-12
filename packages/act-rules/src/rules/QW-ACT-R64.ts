import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, IsHTMLDocument } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R64 extends AtomicRule {
  @IsHTMLDocument
  @ElementExists
  execute(element: QWElement): void {
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
            test.verdict = Verdict.WARNING;
            test.resultCode = 'W1';
            hasLinks = true;
            break;
          }
        }
      }
    }

    if (!hasLinks) {
      test.verdict = Verdict.PASSED;
      test.resultCode = 'P1';
    }

    test.addElement(element, false);
    this.addTestResult(test);
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

export { QW_ACT_R64 };
