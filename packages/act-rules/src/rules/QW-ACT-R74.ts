import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';

@ACTRuleDecorator
class QW_ACT_R74 extends Rule {
  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    let hasLinks = false;
    const links = element.getElements('a');
    if (links) {
      const host = location.hostname;
      const linksWithAnchors = new Array<QWElement>();
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
          } catch (e) {
            console.log(anchor);
            console.log(e);
          }
          const focusedElement = page.getFocusedElement();
          if (anchor.getElementSelector() !== focusedElement.getElementSelector()) {
            nSkipLinks++;
          }
        }

        if (nSkipLinks > 0) {
          evaluation.verdict = 'warning';
          evaluation.description = `
            The page has at least ${nSkipLinks} instrument(s) to move focus. 
            Check if any of these instrument(s) is being used before a block of repeated content, and the focus is moved to just before a block of non-repeated content.
          `;
          evaluation.resultCode = 'RC2';
        } else {
          evaluation.verdict = 'warning';
          evaluation.description = `
            Check if the page has any instrument(s) to move focus. 
            Check if any of these instrument(s) is being used before a block of repeated content, and the focus is moved to just before a block of non-repeated content.
          `;
          evaluation.resultCode = 'RC3';
        }
      }
    }

    if (!hasLinks) {
      evaluation.verdict = 'passed';
      evaluation.description = `The page doesn't have repeated content.`;
      evaluation.resultCode = 'RC1';
    }

    super.addEvaluationResult(evaluation, element, false);
  }
}

export = QW_ACT_R74;
