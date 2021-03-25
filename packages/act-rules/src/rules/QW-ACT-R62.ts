import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils } from '@qualweb/util';
import Rule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';

@ACTRuleDecorator
class QW_ACT_R62 extends Rule {
  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {
    const elementList = element.getElements('*');
    const inSequentialFocusList = elementList.filter((element) => {
      return AccessibilityUtils.isPartOfSequentialFocusNavigation(element, page);
    });
    let evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    if (inSequentialFocusList.length > 1) {
      for (const inSequentialFocusElement of inSequentialFocusList || []) {
        evaluation.verdict = 'warning';
        evaluation.description = ' Check if the element has some visible focus indication';
        evaluation.resultCode = 'RC1';
        super.addEvaluationResult(evaluation, inSequentialFocusElement);
        evaluation = {
          verdict: '',
          description: '',
          resultCode: ''
        };
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = "The page doesn't have 2 elements in sequential focus order";
      evaluation.resultCode = 'RC2';
      super.addEvaluationResult(evaluation, element, false, false);
    }
  }
}

export = QW_ACT_R62;
