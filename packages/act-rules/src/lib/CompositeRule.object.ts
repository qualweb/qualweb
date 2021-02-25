import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';
import clone from 'lodash.clone';
import cloneDeep from 'lodash.clonedeep';
import { QWElement } from '@qualweb/qw-element';
import { AccessibilityUtils } from '@qualweb/util';
import { QWPage } from '@qualweb/qw-page';

abstract class Rule {
  private rule: ACTRule;

  constructor(rule: ACTRule) {
    this.rule = rule;
  }

  getRuleMapping(): string {
    return this.rule.mapping;
  }

  hasPrincipleAndLevels(principles: string[], levels: string[]): boolean {
    let has = false;
    for (let sc of this.rule.metadata['success-criteria'] || []) {
      if (principles.includes(sc.principle) && levels.includes(sc.level)) {
        has = true;
      }
    }
    return has;
  }

  protected getNumberOfPassedResults(): number {
    return this.rule.metadata.passed;
  }

  protected getNumberOfWarningResults(): number {
    return this.rule.metadata.warning;
  }

  protected getNumberOfFailedResults(): number {
    return this.rule.metadata.failed;
  }

  protected addEvaluationResult(
    result: ACTRuleResult,
    element?: QWElement,
    withText: boolean = true,
    fullElement: boolean = false,
    aName?: boolean,
    page?: QWPage
  ): void {
    if (element) {
      const htmlCode = element.getElementHtmlCode(withText, fullElement);
      const pointer = element.getElementSelector();
      let accessibleName: string | undefined;

      if (aName && page) {
        accessibleName = AccessibilityUtils.getAccessibleName(element, page);
      }
      result.elements = [{ htmlCode, pointer, accessibleName }];
    }

    this.rule.results.push(clone(result));

    if (result.verdict && result.verdict !== 'inapplicable') {
      this.rule.metadata[result.verdict]++;
    }
  }

  abstract execute(element: QWElement, rules: Array<ACTRule>): void;

  // results
  conjunction(element: QWElement, rules: Array<ACTRule>): void {
    let selector = element.getElementSelector();
    let results = this.getAtomicRuleResultPerVerdict(selector, rules);
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };
    if (results['failed']) {
      evaluation.verdict = 'failed';
      evaluation.resultCode = 'RC1';
      evaluation.description =
        'The rule failed because of the rule ' + results['failed'].title + 'with the code' + results['failed'].code; //title + id
    } else if (results['warning']) {
      evaluation.verdict = 'warning';
      evaluation.resultCode = 'RC2';
      evaluation.description =
        "The rule can't tell because of the rule " +
        results['warning'].title +
        'with the code' +
        results['warning'].code; //title + id
    } else if (results['passed']) {
      evaluation.verdict = 'passed';
      evaluation.resultCode = 'RC3';
      evaluation.description =
        'The rule passed because of the rule ' + results['passed'].title + 'with the code' + results['passed'].code; //title + id
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.resultCode = 'RC4';
      evaluation.description = "The test target doesn't apply to this rule"; //title + id
    }
    this.addEvaluationResult(evaluation, element);
  }
  disjunction(element: QWElement, rules: Array<ACTRule>): void {
    let selector = element.getElementSelector();
    let results = this.getAtomicRuleResultPerVerdict(selector, rules);
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };
    if (results['passed']) {
      evaluation.verdict = 'passed';
      evaluation.resultCode = 'RC1';
      evaluation.description =
        'The rule passed because of the rule ' + results['passed'].title + 'with the code' + results['passed'].code; //title + id
    } else if (results['warning']) {
      evaluation.verdict = 'warning';
      evaluation.resultCode = 'RC2';
      evaluation.description =
        "The rule can't tell because of the rule " +
        results['warning'].title +
        'with the code' +
        results['warning'].code; //title + id
    } else if (results['failed']) {
      evaluation.verdict = 'failed';
      evaluation.resultCode = 'RC3';
      evaluation.description =
        'The rule failed because of the rule ' + results['failed'].title + 'with the code' + results['failed'].code; //title + id
    } else {
      evaluation.verdict = 'inapplicable';
      evaluation.resultCode = 'RC4';
      evaluation.description = "The test target doesn't apply to this rule"; //title + id
    }
    this.addEvaluationResult(evaluation, element);
  }

  getAtomicRuleResultPerVerdict(selector: string, rules: Array<ACTRule>): any {
    const ruleResult: any = {};
    for (let rule of rules) {
      if (rule) {
        for (let result of rule.results) {
          if (result.elements && result.elements[0].pointer === selector && !ruleResult[result.verdict]) {
            ruleResult[result.verdict] = { title: rule.name, code: rule.mapping };
          }
        }
      }
    }
    return ruleResult;
  }

  getAtomicRuleResultForElement(selector: string, rules: Array<ACTRule>): any {
    const ruleResult: any = {};
    for (const rule of rules || []) {
      ruleResult[rule.code] = { title: rule.name, code: rule.mapping, verdict: 'inapplicable' };
      for (let result of rule.results) {
        if (result.elements && result.elements[0].pointer === selector) {
          ruleResult[rule.code] = { title: rule.name, code: rule.mapping, verdict: result.verdict };
        }
      }
    }
    return ruleResult;
  }

  getFinalResults(): ACTRule {
    this.outcomeRule();
    return cloneDeep(this.rule);
  }

  reset(): void {
    this.rule.metadata.passed = 0;
    this.rule.metadata.warning = 0;
    this.rule.metadata.failed = 0;
    this.rule.results = new Array<ACTRuleResult>();
  }

  private outcomeRule(): void {
    if (this.rule.metadata.failed > 0) {
      this.rule.metadata.outcome = 'failed';
    } else if (this.rule.metadata.warning > 0) {
      this.rule.metadata.outcome = 'warning';
    } else if (this.rule.metadata.passed > 0) {
      this.rule.metadata.outcome = 'passed';
    } else {
      this.rule.metadata.outcome = 'inapplicable';
    }

    if (this.rule.results.length > 0 && this.rule.metadata.outcome !== 'inapplicable') {
      this.addDescription();
    } else {
      this.rule.metadata.description = 'No test targets found.';
    }
  }

  private addDescription(): void {
    for (const result of this.rule.results || []) {
      if (result.verdict === this.rule.metadata.outcome) {
        this.rule.metadata.description = result.description;
        break;
      }
    }
  }
}

export = Rule;
