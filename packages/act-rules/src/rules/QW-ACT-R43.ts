import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, ElementIsVisible } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';
import { DomUtils, AccessibilityUtils } from '@qualweb/util';
import { QWPage } from '@qualweb/qw-page';

@ACTRuleDecorator
class QW_ACT_R43 extends Rule {
  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  @ElementIsVisible
  execute(element: QWElement, page: QWPage): void {
    if (element.getElementTagName().toLowerCase() === 'iframe') {
      return;
    }

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    let hasVisibleChildren = false;
    let isApplicable = false;
    for (const child of element.getElementChildren()) {
      if (DomUtils.isElementVisible(child, page)) {
        hasVisibleChildren = true;
        break;
      }
    }
    if (hasVisibleChildren) {
      const of = element.getElementStyleProperty('overflow', null);
      const ofx = element.getElementStyleProperty('overflow-x', null);
      const ofy = element.getElementStyleProperty('overflow-y', null);

      if (
        of === 'auto' ||
        of === 'clip' ||
        of === 'scroll' ||
        ofx === 'auto' ||
        ofx === 'clip' ||
        ofx === 'scroll' ||
        ofy === 'auto' ||
        ofy === 'clip' ||
        ofy === 'scroll'
      ) {
        const scrollWidth = element.getElementProperty('scrollWidth');
        const clientWidth = element.getElementProperty('clientWidth');

        const differenceWidth = parseInt(scrollWidth) - parseInt(clientWidth);

        const scrollHeight = element.getElementProperty('scrollHeight');
        const clientHeight = element.getElementProperty('clientHeight');

        const differenceHeight = parseInt(scrollHeight) - parseInt(clientHeight);

        const paddingLeft = element.getElementStyleProperty('padding-left', null);
        const paddingRight = element.getElementStyleProperty('padding-right', null);

        const paddingTop = element.getElementStyleProperty('padding-top', null);
        const paddingBottom = element.getElementStyleProperty('padding-bottom', null);

        isApplicable =
          differenceWidth > parseInt(paddingLeft) ||
          differenceWidth > parseInt(paddingRight) ||
          differenceHeight > parseInt(paddingTop) ||
          differenceHeight > parseInt(paddingBottom);
      }
    }

    if (isApplicable) {
      if (this.isInSequentialFocusNavigation(element, page)) {
        evaluation.verdict = 'passed';
        evaluation.description = `This scrollable section element is included in sequential focus navigation.`;
        evaluation.resultCode = 'RC1';
      } else {
        evaluation.verdict = 'failed';
        evaluation.description = `This vertically/horizontally scrollable section element is not included in sequential focus navigation, nor does it have any descendants that are.`;
        evaluation.resultCode = 'RC2';
      }

      super.addEvaluationResult(evaluation, element);
    }
  }

  private isInSequentialFocusNavigation(element: QWElement, page: QWPage): boolean {
    if (AccessibilityUtils.isPartOfSequentialFocusNavigation(element, page)) {
      return true;
    } else {
      let result = false;
      for (const child of element.getElementChildren()) {
        if (AccessibilityUtils.isPartOfSequentialFocusNavigation(child, page)) {
          return true;
        } else {
          result = result || this.isInSequentialFocusNavigation(child, page);
        }
      }
      return result;
    }
  }
}

export = QW_ACT_R43;
