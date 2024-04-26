import type { Test } from '@shared/classes';
import type { Assertion, Level, Principle, TestResult } from '@shared/types';
import type { ModuleTranslator, TranslationValues } from '@qualweb/locale';
import type { QWElement } from '@qualweb/qw-element';
import techniques from './techniques.json';

abstract class Technique {
  protected readonly technique: Assertion;
  private readonly translator: ModuleTranslator;

  constructor(translator: ModuleTranslator) {
    this.translator = translator;
    const technique = techniques[new.target.name as keyof typeof techniques] as Assertion;
    technique.metadata.passed = 0;
    technique.metadata.warning = 0;
    technique.metadata.failed = 0;
    technique.metadata.inapplicable = 0;
    technique.metadata.outcome = 'inapplicable';
    technique.results = new Array<TestResult>();

    this.technique = technique;

    this.translator.translateAssertion(this.technique);
  }

  protected translate(resultCode: string, values?: TranslationValues): string {
    return this.translator.translateTest(this.technique.code, resultCode, values);
  }

  public getCode(): string {
    return this.technique.code;
  }

  public getMapping(): string {
    return this.technique.mapping;
  }

  public hasPrincipleAndLevels(principles: Principle[], levels: Level[]): boolean {
    return this.technique.metadata['success-criteria'].some(
      (sc) => principles.includes(sc.principle) && levels.includes(sc.level)
    );
  }

  public abstract execute(element?: QWElement): void;

  public getFinalResults(): Assertion {
    this.generateOutcome();
    return this.technique;
  }

  protected addTestResult(test: Test): void {
    if (!test.description || test.description.trim() === '') {
      test.description = this.translate(test.resultCode);
    }

    this.technique.results.push(test);

    if (test.verdict && test.verdict !== 'inapplicable') {
      this.technique.metadata[test.verdict]++;
    }
  }

  private generateOutcome(): void {
    if (this.technique.metadata.failed) {
      this.technique.metadata.outcome = 'failed';
    } else if (this.technique.metadata.warning) {
      this.technique.metadata.outcome = 'warning';
    } else if (this.technique.metadata.passed) {
      this.technique.metadata.outcome = 'passed';
    } else {
      this.technique.metadata.outcome = 'inapplicable';
      this.technique.metadata.inapplicable = 1;
    }

    if (this.technique.results.length > 0) {
      this.addDescription();
    }
  }

  private addDescription(): void {
    for (const result of this.technique.results ?? []) {
      if (result.verdict === this.technique.metadata.outcome) {
        this.technique.metadata.description = result.description;
        break;
      }
    }
  }
}

export { Technique };
