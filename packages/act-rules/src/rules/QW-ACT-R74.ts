import type { QWElement } from '@qualweb/qw-element';
import { ElementExists, IsHTMLDocument, IsInMainContext } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { AtomicRule } from '../lib/AtomicRule.object';

class QW_ACT_R74 extends AtomicRule {
  @ElementExists
  @IsHTMLDocument
  @IsInMainContext
  execute(element: QWElement): void {
    const test = new Test();

    let hasLinks = false;
    const links = window.qwPage.getElements('a');
    if (links) {
      const host = location.hostname;
      const linksWithAnchors = new Array<QWElement>();
      for (const link of links) {
        if (link.elementHasAttribute('href')) {
          const href = link.getElementAttribute('href')?.trim();
          if (href && this.checkDestination(href)) {
            linksWithAnchors.push(link);
          } else if (href && (href.startsWith('/') || href.startsWith('.') || href.startsWith(host))) {
            hasLinks = true;
          }
        }
      }

      if (hasLinks) {
        let nSkipLinks = 0;
        for (const anchor of linksWithAnchors) {
          const href = anchor.getElementAttribute('href')?.trim();
          if (href) {
            const id = href.split('#')[1];
            if (window.qwPage.getElementByID(id)) {
              nSkipLinks++;
            }
          }
          /*anchor.focusElement();
          try {
            anchor.click();
          } finally {
          }
          const focusedElement = window.qwPage.getFocusedElement();
          if (focusedElement && anchor.getElementSelector() !== focusedElement.getElementSelector()) {
            nSkipLinks++;
          }*/
        }

        if (nSkipLinks > 0) {
          test.verdict = Verdict.WARNING;
          test.resultCode = 'W1';
        } else {
          test.verdict = Verdict.WARNING;
          test.resultCode = 'W2';
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

export { QW_ACT_R74 };
