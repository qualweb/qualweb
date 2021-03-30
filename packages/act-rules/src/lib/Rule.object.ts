import { ACTRule } from '@qualweb/act-rules';
import { Level, Principle } from '@qualweb/evaluation';

import Test from './Test.object';
abstract class Rule {
  private readonly rule: ACTRule;

  constructor(rule: ACTRule) {
    this.rule = rule;
  }

  public getRuleMapping(): string {
    return this.rule.mapping;
  }

  public hasPrincipleAndLevels(principles: Array<Principle>, levels: Array<Level>): boolean {
    let has = false;
    for (const sc of this.rule.metadata['success-criteria'] ?? []) {
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

  protected addTestResult(test: Test): void {
    this.rule.results.push(test);

    if (test.verdict && test.verdict !== 'inapplicable') {
      this.rule.metadata[test.verdict]++;
    }
  }

  public getFinalResults(): ACTRule {
    this.outcomeRule();
    return this.rule;
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
      this.rule.metadata.inapplicable = 1;
    }

    if (this.rule.results.length > 0) {
      this.addDescription();
    }
  }

  private addDescription(): void {
    for (const result of this.rule.results ?? []) {
      if (result.verdict === this.rule.metadata.outcome) {
        this.rule.metadata.description = result.description;
        break;
      }
    }
  }
}

export = Rule;
