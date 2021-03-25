import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';
import Rule from './Rule.object';

abstract class CompositeRule extends Rule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  abstract execute(element: QWElement | undefined, page?: QWPage, rules?: Array<ACTRule>): void;

  public conjunction(element: QWElement, rules: Array<ACTRule>): void {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const selector = element.getElementSelector();
    const results = this.getAtomicRuleResultPerVerdict(selector, rules);
    if (results['failed']) {
      evaluation.verdict = 'failed';
      evaluation.resultCode = 'RC1';
      evaluation.description = 'The rule failed because of the rule ' + results['failed'].code;
    } else if (results['warning']) {
      evaluation.verdict = 'warning';
      evaluation.resultCode = 'RC2';
      evaluation.description = "The rule can't tell because of the rule " + results['warning'].code;
    } else if (results['passed']) {
      evaluation.verdict = 'passed';
      evaluation.resultCode = 'RC3';
      evaluation.description = 'The rule passed because of the rule ' + results['passed'].code;
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.resultCode = 'RC4';
      evaluation.description = "The test target doesn't apply to this rule";
    }
    super.addEvaluationResult(evaluation, element);
  }

  public disjunction(element: QWElement, rules: Array<ACTRule>): void {
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const selector = element.getElementSelector();
    const results = this.getAtomicRuleResultPerVerdict(selector, rules);
    if (results['passed']) {
      evaluation.verdict = 'passed';
      evaluation.resultCode = 'RC1';
      evaluation.description = 'The rule passed because of the rule ' + results['passed'].code;
    } else if (results['warning']) {
      evaluation.verdict = 'warning';
      evaluation.resultCode = 'RC2';
      evaluation.description = "The rule can't tell because of the rule " + results['warning'].code;
    } else if (results['failed']) {
      evaluation.verdict = 'failed';
      evaluation.resultCode = 'RC3';
      evaluation.description = 'The rule failed because of the rule ' + results['failed'].code;
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.resultCode = 'RC4';
      evaluation.description = "The test target doesn't apply to this rule";
    }
    super.addEvaluationResult(evaluation, element);
  }

  public getAtomicRuleResultPerVerdict(selector: string, rules: Array<ACTRule>): any {
    const ruleResult: any = {};
    for (const rule of rules) {
      if (rule) {
        for (const result of rule.results) {
          if (result.elements && result.elements[0].pointer === selector && !ruleResult[result.verdict]) {
            ruleResult[result.verdict] = { title: rule.name, code: rule.code };
          }
        }
      }
    }
    return ruleResult;
  }

  public getAtomicRuleResultForElement(selector: string, rules: Array<ACTRule>): any {
    const ruleResult: any = {};
    for (const rule of rules || []) {
      ruleResult[rule.code] = { title: rule.name, code: rule.mapping, verdict: 'inapplicable' };
      for (const result of rule.results) {
        if (result.elements && result.elements[0].pointer === selector) {
          ruleResult[rule.code] = { title: rule.name, code: rule.mapping, verdict: result.verdict };
        }
      }
    }
    return ruleResult;
  }
}

export = CompositeRule;
