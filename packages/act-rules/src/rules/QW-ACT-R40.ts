'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';
import { DomUtils } from '@qualweb/util';
import { QWPage } from '@qualweb/qw-page';

@ACTRuleDecorator
class QW_ACT_R40 extends Rule {
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

    if (element.elementHasTextNode()) {
      if (DomUtils.isElementVisible(element, page)) {
        let isApplicable = false;

        let parent: QWElement | null = element;
        while (parent && parent.getElementTagName().toLowerCase() !== 'html') {
          if (parent.getElementTagName().toLowerCase() === 'svg') {
            isApplicable = false;
            break;
          }

          const of = parent.getElementStyleProperty('overflow', null);
          const ofx = parent.getElementStyleProperty('overflow-x', null);
          const ofy = parent.getElementStyleProperty('overflow-y', null);

          if (
            of === 'hidden' ||
            of === 'clip' ||
            ofx === 'hidden' ||
            ofx === 'clip' ||
            ofy === 'hidden' ||
            ofy === 'clip'
          ) {
            isApplicable = true;
          }

          const ariaHidden = parent.getElementAttribute('aria-hidden');
          if (ariaHidden !== null && ariaHidden === 'true') {
            isApplicable = false;
            break;
          }

          parent = parent.getElementParent();
        }

        if (isApplicable) {
          evaluation.verdict = 'warning';
          evaluation.description = 'Check if each ancestor og the text node is not clipped by overflow';
          evaluation.resultCode = 'RC1';

          super.addEvaluationResult(evaluation, element);
        }
      }
    }
  }
}

export = QW_ACT_R40;
