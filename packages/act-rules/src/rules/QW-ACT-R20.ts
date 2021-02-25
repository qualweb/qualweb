import { ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityUtils, DomUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';

@ACTRuleDecorator
class QW_ACT_R20 extends Rule {
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

    const roleAttr = element.getElementAttribute('role');

    if (roleAttr && roleAttr.trim().length > 0) {
      const isHidden = DomUtils.isElementHidden(element, page);
      if (!isHidden) {
        if (AccessibilityUtils.elementHasValidRole(element, page)) {
          evaluation.verdict = 'passed';
          evaluation.description = `The test target has a valid \`role\` attribute.`;
          evaluation.resultCode = 'RC1';
        } else {
          evaluation.verdict = 'failed';
          evaluation.description = `The test target has an invalid \`role\` attribute.`;
          evaluation.resultCode = 'RC2';
        }
      } else {
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The test target is not included in the accessibility tree.`;
        evaluation.resultCode = 'RC3';
      }
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The \`role\` attribute doesn't exist or is empty ("").`;
      evaluation.resultCode = 'RC4';
    }

    super.addEvaluationResult(evaluation, element);
  }
}

export = QW_ACT_R20;
