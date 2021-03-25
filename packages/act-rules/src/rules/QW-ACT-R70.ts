'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils, DomUtils } from '@qualweb/util';
import Rule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, ElementHasNegativeTabIndex } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';

@ACTRuleDecorator
class QW_ACT_R70 extends Rule {
  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  @ElementHasNegativeTabIndex
  execute(element: QWElement, page: QWPage): void {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (!DomUtils.isElementVisible(element, page)) {
      evaluation.verdict = 'passed';
      evaluation.description =
        ' The nested browsing context does not include elements that are visible and part of the sequential focus navigation.';
      evaluation.resultCode = 'RC1';
      super.addEvaluationResult(evaluation, element);
    } else {
      const elementList = page.getElements('*', undefined);
      const inSequentialFocusList = elementList.filter((elem) => {
        return (
          AccessibilityUtils.isPartOfSequentialFocusNavigation(elem, page) && DomUtils.isElementVisible(elem, page)
        );
      });

      if (inSequentialFocusList.length === 0) {
        evaluation.verdict = 'passed';
        evaluation.description =
          ' The nested browsing context does not include elements that are visible and part of the sequential focus navigation.';
        evaluation.resultCode = 'RC1';
        super.addEvaluationResult(evaluation, element);
      } else {
        evaluation.verdict = 'failed';
        evaluation.description =
          'The nested browsing context includes elements that are visible and part of the sequential focus navigation.';
        evaluation.resultCode = 'RC2';
        super.addEvaluationResult(evaluation, element, false, false);
      }
    }
  }
}

export = QW_ACT_R70;
