import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';
import clone from 'lodash.clone';
import cloneDeep from 'lodash.clonedeep';
import { QWElement } from '@qualweb/qw-element';

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

  protected addEvaluationResult(result: ACTRuleResult, element?: QWElement, withText: boolean = true, fullElement: boolean = false): void {
    if (element) {
      const htmlCode = element.getElementHtmlCode(withText, fullElement);
      const pointer = element.getElementSelector();
      result.htmlCode = htmlCode;
      result.pointer = pointer;
    }

    this.rule.results.push(clone(result));

    if (result.verdict !== 'inapplicable') {
      this.rule.metadata[result.verdict]++;
    }
  }

  abstract execute(element: QWElement, rules: Array<ACTRule>): void;

  //resultados
  conjunction(element: QWElement, rules: Array<ACTRule>): void {
    let selector = element.getElementSelector();
    let results = this.getAtomicRuleResultForElement(selector,rules);
    let values = Object.values(results);
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };
    if(values.includes("failed")){
      evaluation.verdict="failed"
      evaluation.resultCode = "RC1"
      evaluation.description = "The rule failed because of the rule" //title + id
    }
    else if(values.includes("warning")){
      evaluation.verdict="warning"
      evaluation.resultCode = "RC2"
      evaluation.description = "The rule can't tell because of the rule" //title + id
    }
    else if(values.includes("passed")){
      evaluation.verdict="passed"
      evaluation.resultCode = "RC3"
      evaluation.description = "The rule passed because of the rule" //title + id
    }else{
      evaluation.verdict="inapplicable"
      evaluation.resultCode = "RC4"
      evaluation.description = "The test target doesn't apply to this rule" //title + id
    }
    this.addEvaluationResult(evaluation, element);

  }
  dijunction(element: QWElement, rules: Array<ACTRule>): void {
    let selector = element.getElementSelector();
    let results = this.getAtomicRuleResultForElement(selector,rules);
    let values = Object.values(results);
    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };
    if(values.includes("passed")){
      evaluation.verdict="passed"
      evaluation.resultCode = "RC1"
      evaluation.description = "The rule passed because of the rule" //title + id
    }
    else if(values.includes("warning")){
      evaluation.verdict="warning"
      evaluation.resultCode = "RC2"
      evaluation.description = "The rule can't tell because of the rule" //title + id
    }
    else if(values.includes("failed")){
      evaluation.verdict="failed"
      evaluation.resultCode = "RC3"
      evaluation.description = "The rule failed because of the rule" //title + id
    }else{
      evaluation.verdict="inapplicable"
      evaluation.resultCode = "RC4"
      evaluation.description = "The test target doesn't apply to this rule" //title + id
    }
    this.addEvaluationResult(evaluation, element);

  }

  getAtomicRuleResultForElement(selector: string, rules: Array<ACTRule>): any {
    let ruleResult = {};
    for (let rule of rules) {
      ruleResult[rule.code] = "inapplicable"
      for (let result of rule.results) {
        if (result.pointer === selector) {
          ruleResult[rule.code] = result.verdict;
        }

      }
    }
    return ruleResult;
  }

  getFinalResults(): any {
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
      this.rule.metadata.description = 'No test targets found.'
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
