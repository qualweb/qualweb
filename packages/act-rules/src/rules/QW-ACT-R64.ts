import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists, IsHTMLDocument } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';

@ACTRuleDecorator
class QW_ACT_R64 extends Rule {
  constructor(rule?: any) {
    super(rule);
  }

  @IsHTMLDocument
  @ElementExists
  execute(element: QWElement): void {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    let hasLinks = false;
    const links = element.getElements('a');
    if (links) {
      const host = location.hostname;
      for (const link of links) {
        if (link.elementHasAttribute('href')) {
          const href = (<string>link.getElementAttribute('href')).trim();
          if (!href.startsWith('#') && (href.startsWith('/') || href.startsWith('.') || href.startsWith(host))) {
            evaluation.verdict = 'warning';
            evaluation.description = `
              Check either there is no non-repeated content after repeated content or there exists an element for which all the following are true:
               - the element is non-repeated content after repeated content; and
               - the element has a semantic role of heading; and
               - the element is visible; and
               - the element is included in the accessibility tree.
            `;
            evaluation.resultCode = 'RC2';
            hasLinks = true;
            break;
          }
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

export = QW_ACT_R64;
