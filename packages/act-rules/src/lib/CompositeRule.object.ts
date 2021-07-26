import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import Rule from './Rule.object';
import Test from './Test.object';

abstract class CompositeRule extends Rule {
  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
  }

  abstract execute(element: typeof window.qwElement | undefined, rules?: Array<ACTRule>): void;

  public conjunction(element: typeof window.qwElement, rules: Array<ACTRule>): void {
    const test = new Test();

    const selector = element.getElementSelector();
    const results = this.getAtomicRuleResultPerVerdict(selector, rules);
    if (results['failed']) {
      test.verdict = 'failed';
      test.resultCode = 'F1';
      test.description = super.getTranslation(test.resultCode) + results['failed'].code;
    } else if (results['warning']) {
      test.verdict = 'warning';
      test.resultCode = 'W1';
      test.description = super.getTranslation(test.resultCode) + results['warning'].code;
    } else if (results['passed']) {
      test.verdict = 'passed';
      test.resultCode = 'P1';
      test.description = super.getTranslation(test.resultCode) + results['passed'].code;
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
      test.resultCode = 'P1';
      test.description = super.getTranslation(test.resultCode) + results['passed'].code;
    } else if (results['warning']) {
      test.verdict = 'warning';
      test.resultCode = 'W1';
      test.description = super.getTranslation(test.resultCode) + results['warning'].code;
    } else if (results['failed']) {
      test.verdict = 'failed';
      test.resultCode = 'F1';
      test.description = super.getTranslation(test.resultCode) + results['failed'].code;
    }

    test.addElement(element);
    super.addTestResult(test);
  }

  public getAtomicRuleResultPerVerdict(selector: string, rules: Array<ACTRule>): any {
    const ruleResult: any = {};
    for (const rule of rules ?? []) {
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
    for (const rule of rules ?? []) {
      ruleResult[rule.code] = { title: rule.name, code: rule.code, verdict: 'inapplicable' };
      for (const result of rule.results ?? []) {
        if (result.elements && result.elements[0].pointer === selector) {
          ruleResult[rule.code] = { title: rule.name, code: rule.code, verdict: result.verdict };
        }
      }
    }
    return ruleResult;
  }
}

export = CompositeRule;
