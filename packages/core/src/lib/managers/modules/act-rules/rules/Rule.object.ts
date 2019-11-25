import { Page, ElementHandle } from 'puppeteer';
import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';
import _ from 'lodash';

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

  protected getNumberOfInapplicableResults(): number {
    return this.rule.metadata.inapplicable;
  }

  protected addEvaluationResult(result: ACTRuleResult): void {
    this.rule.results.push(_.clone(result));
    this.rule.metadata[result.verdict]++;
  }

  abstract async execute(element: ElementHandle | undefined, page: Page): Promise<void>;

  getFinalResults(): any {
    this.outcomeRule();
    return _.cloneDeep(this.rule);
  }

  reset(): void {
    this.rule.metadata.passed = 0;
    this.rule.metadata.warning = 0;
    this.rule.metadata.failed = 0;
    this.rule.metadata.inapplicable = 0;
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

    if (this.rule.results.length > 0) {
      this.addDescription();
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