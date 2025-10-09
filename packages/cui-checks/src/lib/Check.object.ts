import type { ModuleTranslator } from '@qualweb/core/locale';
import type { TranslationValues } from '@qualweb/locale';
import type { QWElement } from '@qualweb/qw-element';
import type { Assertion, Level, Principle, TestResult, Test } from '@qualweb/core/evaluation';
import { Guideline, Verdict } from '@qualweb/core/evaluation';
import checks from './checks.json';
import { RuleTest } from './types';

abstract class Check extends Guideline {
  protected readonly check: Assertion;
  protected readonly translator: ModuleTranslator;
  protected readonly settings: { [key: string]: string | number | boolean };
  protected readonly testResult:RuleTest|undefined;
  constructor(translator: ModuleTranslator, settings: { [key: string]: string | number | boolean },test?:RuleTest) {
    super();
    this.translator = translator;
    const check = checks[new.target.name as keyof typeof checks] as unknown as Assertion;
    this.testResult = test;
    this.settings = settings;
    check.metadata.passed = 0;
    check.metadata.warning = 0;
    check.metadata.failed = 0;
    check.metadata.inapplicable = 0;
    check.metadata.outcome = Verdict.INAPPLICABLE;
    check.results = new Array<TestResult>();
    this.check = check;
    this.translator.translateAssertion(this.check);
  }

  protected translate(resultCode: string, values?: TranslationValues): string {
    return this.translator.translateTest(this.check.code, resultCode, values);
  }

  public getCode(): string {
    return this.check.code;
  }

  public getMapping(): string {
    return this.check.mapping;
  }

  public hasPrincipleAndLevels(principles: Principle[], levels: Level[]): boolean {
    return this.check.metadata['success-criteria'].some(
      (sc) => principles.includes(sc.principle) && levels.includes(sc.level)
    );
  }

  public abstract execute(element?: QWElement): Promise<void>;

  public getFinalResults(): Assertion {
    this.generateOutcome();
    return this.check;
  }

  protected addTestResult(test: Test): void {
    if (!test.description || test.description.trim() === '') {
      test.description =  this.check.description;
      //test.description = this.translate(test.resultCode);
    }

    this.check.results.push(test);

    if (test.verdict && test.verdict !== Verdict.INAPPLICABLE) {
      this.check.metadata[test.verdict]++;
    }
  }

  private generateOutcome(): void {
    if (this.check.metadata.failed) {
      this.check.metadata.outcome = Verdict.FAILED;
    } else if (this.check.metadata.warning) {
      this.check.metadata.outcome = Verdict.WARNING;
    } else if (this.check.metadata.passed) {
      this.check.metadata.outcome = Verdict.PASSED;
    } else {
      this.check.metadata.outcome = Verdict.INAPPLICABLE;
      this.check.metadata.inapplicable = 1;
    }

    if (this.check.results.length > 0) {
      this.addDescription();
    }
  }

  private addDescription(): void {
    for (const result of this.check.results ?? []) {
      if (result.verdict === this.check.metadata.outcome) {
        this.check.metadata.description = result.description;
        break;
      }
    }
  }
}

export { Check };
