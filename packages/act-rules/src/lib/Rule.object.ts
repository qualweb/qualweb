import type { ModuleTranslator, TranslationValues } from '@qualweb/locale';
import type { TestResult, Assertion, Level, Principle } from '@qualweb/common';
import { Verdict } from '@qualweb/common';
import { Guideline, type Test } from '@qualweb/common';
import rules from './rules.json';

abstract class Rule extends Guideline {
  protected readonly rule: Assertion;
  private readonly translator: ModuleTranslator;

  constructor(translator: ModuleTranslator) {
    super();
    this.translator = translator;
    const rule = rules[new.target.name as keyof typeof rules] as Assertion;
    rule.metadata.passed = 0;
    rule.metadata.warning = 0;
    rule.metadata.failed = 0;
    rule.metadata.inapplicable = 0;
    rule.metadata.outcome = Verdict.INAPPLICABLE;
    rule.results = new Array<TestResult>();

    this.rule = rule;

    this.translator.translateAssertion(this.rule);
  }

  protected translate(resultCode: string, values?: TranslationValues): string {
    return this.translator.translateTest(this.rule.code, resultCode, values);
  }

  public getCode(): string {
    return this.rule.code;
  }

  public getMapping(): string {
    return this.rule.mapping;
  }

  public hasPrincipleAndLevels(principles: Principle[], levels: Level[]): boolean {
    return this.rule.metadata['success-criteria'].some(
      (sc) => principles.includes(sc.principle) && levels.includes(sc.level)
    );
  }

  public getFinalResults(): Assertion {
    this.generateOutcome();
    return this.rule;
  }

  protected addTestResult(test: Test): void {
    if (!test.description || test.description.trim() === '') {
      test.description = this.translate(test.resultCode);
    }

    this.rule.results.push(test);

    if (test.verdict && test.verdict !== Verdict.INAPPLICABLE) {
      this.rule.metadata[test.verdict]++;
    }
  }

  private generateOutcome(): void {
    if (this.rule.metadata.failed) {
      this.rule.metadata.outcome = Verdict.FAILED;
    } else if (this.rule.metadata.warning) {
      this.rule.metadata.outcome = Verdict.WARNING;
    } else if (this.rule.metadata.passed) {
      this.rule.metadata.outcome = Verdict.PASSED;
    } else {
      this.rule.metadata.outcome = Verdict.INAPPLICABLE;
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

export { Rule };
