import type { TranslationValues } from '@qualweb/locale';
import type { QWElement } from '@qualweb/qw-element';
import type { Level, Principle, TestResult, Assertion, Test } from '@qualweb/core/evaluation';
import { Verdict, Guideline } from '@qualweb/core/evaluation';
import { ModuleTranslator } from '@qualweb/core/locale';
import bestPractices from './bestPractices.json';

abstract class BestPractice extends Guideline {
  protected readonly bestPractice: Assertion;
  private readonly translator: ModuleTranslator;

  constructor(translator: ModuleTranslator) {
    super();
    this.translator = translator;
    const bestPractice = bestPractices[new.target.name as keyof typeof bestPractices] as Assertion;
    bestPractice.metadata.passed = 0;
    bestPractice.metadata.warning = 0;
    bestPractice.metadata.failed = 0;
    bestPractice.metadata.inapplicable = 0;
    bestPractice.metadata.outcome = Verdict.INAPPLICABLE;
    bestPractice.results = new Array<TestResult>();

    this.bestPractice = bestPractice;

    this.translator.translateAssertion(this.bestPractice);
  }

  protected translate(resultCode: string, values?: TranslationValues): string {
    return this.translator.translateTest(this.bestPractice.code, resultCode, values);
  }

  public getCode(): string {
    return this.bestPractice.code;
  }

  public getMapping(): string {
    return this.bestPractice.mapping;
  }

  public hasPrincipleAndLevels(principles: Principle[], levels: Level[]): boolean {
    return this.bestPractice.metadata['success-criteria'].some(
      (sc) => principles.includes(sc.principle) && levels.includes(sc.level)
    );
  }

  public getFinalResults(): Assertion {
    this.generateOutcome();
    return this.bestPractice;
  }

  public abstract execute(element?: QWElement): void;

  protected addTestResult(test: Test): void {
    if (!test.description || test.description.trim() === '') {
      test.description = this.translate(test.resultCode);
    }

    this.bestPractice.results.push(test);

    if (test.verdict && test.verdict !== Verdict.INAPPLICABLE) {
      this.bestPractice.metadata[test.verdict]++;
    }
  }

  private generateOutcome(): void {
    if (this.bestPractice.metadata.failed) {
      this.bestPractice.metadata.outcome = Verdict.FAILED;
    } else if (this.bestPractice.metadata.warning) {
      this.bestPractice.metadata.outcome = Verdict.WARNING;
    } else if (this.bestPractice.metadata.passed) {
      this.bestPractice.metadata.outcome = Verdict.PASSED;
    } else {
      this.bestPractice.metadata.outcome = Verdict.INAPPLICABLE;
      this.bestPractice.metadata.inapplicable = 1;
    }

    if (this.bestPractice.results.length > 0) {
      this.addDescription();
    }
  }

  private addDescription(): void {
    for (const result of this.bestPractice.results ?? []) {
      if (result.verdict === this.bestPractice.metadata.outcome) {
        this.bestPractice.metadata.description = result.description;
        break;
      }
    }
  }
}

export { BestPractice };
