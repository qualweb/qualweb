import { ACTRule } from '@qualweb/act-rules';
import Rule from './Rule.object';
import Test from './Test.object';

abstract class CompositeRule extends Rule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  abstract execute(element: typeof window.qwElement | undefined, rules?: Array<ACTRule>): void;

  public conjunction(element: typeof window.qwElement, rules: Array<ACTRule>): void {
    const test = new Test();

    const selector = element.getElementSelector();
    const results = this.getAtomicRuleResultPerVerdict(selector, rules);
    if (results['failed']) {
      test.verdict = 'failed';
      test.resultCode = 'RC1';
      test.description = 'The rule failed because of the rule ' + results['failed'].code;
    } else if (results['warning']) {
      test.verdict = 'warning';
      test.resultCode = 'RC2';
      test.description = "The rule can't tell because of the rule " + results['warning'].code;
    } else if (results['passed']) {
      test.verdict = 'passed';
      test.resultCode = 'RC3';
      test.description = 'The rule passed because of the rule ' + results['passed'].code;
    } else {
      test.verdict = 'inapplicable';
      test.resultCode = 'RC4';
      test.description = "The test target doesn't apply to this rule";
    }

    test.addElement(element);
    super.addTestResult(test);
  }

  public disjunction(element: typeof window.qwElement, rules: Array<ACTRule>): void {
    const test = new Test();

    const selector = element.getElementSelector();
    const results = this.getAtomicRuleResultPerVerdict(selector, rules);
    if (results['passed']) {
      test.verdict = 'passed';
      test.resultCode = 'RC1';
      test.description = 'The rule passed because of the rule ' + results['passed'].code;
    } else if (results['warning']) {
      test.verdict = 'warning';
      test.resultCode = 'RC2';
      test.description = "The rule can't tell because of the rule " + results['warning'].code;
    } else if (results['failed']) {
      test.verdict = 'failed';
      test.resultCode = 'RC3';
      test.description = 'The rule failed because of the rule ' + results['failed'].code;
    } else {
      test.verdict = 'inapplicable';
      test.resultCode = 'RC4';
      test.description = "The test target doesn't apply to this rule";
    }

    test.addElement(element);
    super.addTestResult(test);
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
