'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils, DomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';

@ACTRuleDecorator
class QW_ACT_R72 extends Rule {
  constructor(rule?: any) {
    super(rule);
  }

  execute(element: QWElement, page: QWPage): void {
    let evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const elementList = page.getElements('*');
    //mudar para find
    const inSequentialFocusList = elementList.filter((element) => {
      return AccessibilityUtils.isPartOfSequentialFocusNavigation(element, page);
    });

    if (inSequentialFocusList.length > 0) {
      const focused = page.getFocusedElement();

      // is keyboard actionable
      if (
        !AccessibilityUtils.isPartOfSequentialFocusNavigation(focused, page) ||
        !DomUtils.isElementVisible(focused, page)
      ) {
        // not checking if it is possible to fire an event at the element with the keyboard
        evaluation.verdict = 'failed';
        evaluation.description = 'The first focusable element is not keyboard actionable';
        evaluation.resultCode = 'RC2';
        super.addEvaluationResult(evaluation, focused, false, false);
      } else if (!AccessibilityUtils.isElementInAT(focused, page)) {
        evaluation.verdict = 'failed';
        evaluation.description = 'The first focusable element is not in the accessibility tree';
        evaluation.resultCode = 'RC3';
        super.addEvaluationResult(evaluation, focused, false, false);
      } else if (AccessibilityUtils.getElementRole(focused, page) !== 'link') {
        evaluation.verdict = 'failed';
        evaluation.description = 'The first focusable element does not have the role of link';
        evaluation.resultCode = 'RC4';
        super.addEvaluationResult(evaluation, focused, false, false);
      } else if (focused.getElementAttribute('href')) {
        const destination = focused.getElementAttribute('href')?.trim();
        if (destination && destination.startsWith('#')) {
          // only checking that it has an url that starts with # -- other ways of linking to the same page are not considered
          if (page.getElementByID(destination.substring(1))) {
            evaluation.verdict = 'warning';
            evaluation.description =
              'Check that the first focusable element has an accessible name that communicates that it skips content';
            evaluation.resultCode = 'RC7';
            super.addEvaluationResult(evaluation, focused);
          } else {
            evaluation.verdict = 'failed';
            evaluation.description = 'The first focusable element does not skip to the main content';
            evaluation.resultCode = 'RC6';
            super.addEvaluationResult(evaluation, focused, false, false);              
          }
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = 'The first focusable element does not skip to the main content';
          evaluation.resultCode = 'RC5';
          super.addEvaluationResult(evaluation, focused, false, false);
        }
      } else {
        evaluation.verdict = 'warning';
        evaluation.description =
          'Check that the first focusable element skips to the main content and its accessible name communicates so';
        evaluation.resultCode = 'RC8';
        super.addEvaluationResult(evaluation, focused);
      }
    } else {
      evaluation.verdict = 'failed';
      evaluation.description = 'The page does not have focusable elements';
      evaluation.resultCode = 'RC1';
      super.addEvaluationResult(evaluation, element, false, false);
    }
  }
}

export = QW_ACT_R72;
