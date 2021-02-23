import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';

@ACTRuleDecorator
class QW_ACT_R73 extends Rule {
  constructor(rule?: any) {
    super(rule);
  }

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
              For each block of repeated content in each test target, which is before (in the flat tree) at least one node of non-repeated content after repeated content, all the following are true:
               - there exists an instrument to make all nodes in this block not visible; and
               - there exists an instrument to remove all nodes in this block from the accessibility tree.
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

export = QW_ACT_R73;
