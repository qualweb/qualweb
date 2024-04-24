import type { ModuleTranslator, TranslationValues } from '@qualweb/locale';
import type { Assertion } from '@qualweb/lib';
import type { Level, Principle, Test, TestResult } from '@qualweb/lib';
import type { QWElement } from '@qualweb/qw-element';
import bestPractices from './bestPractices.json';

abstract class BestPractice {
  protected readonly bestPractice: Assertion;
  private readonly translator: ModuleTranslator;

  constructor(translator: ModuleTranslator) {
    this.translator = translator;
    const bestPractice = bestPractices[new.target.name as keyof typeof bestPractices] as Assertion;
    bestPractice.metadata.passed = 0;
    bestPractice.metadata.warning = 0;
    bestPractice.metadata.failed = 0;
    bestPractice.metadata.inapplicable = 0;
    bestPractice.metadata.outcome = 'inapplicable';
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
    if (!test.description || (<string>test.description).trim() === '') {
      test.description = this.translate(test.resultCode);
    }

    this.bestPractice.results.push(test);

    if (test.verdict !== 'inapplicable') {
      this.bestPractice.metadata[test.verdict]++;
    }
  }

  private generateOutcome(): void {
    if (this.bestPractice.metadata.failed > 0) {
      this.bestPractice.metadata.outcome = 'failed';
    } else if (this.bestPractice.metadata.warning > 0) {
      this.bestPractice.metadata.outcome = 'warning';
    } else if (this.bestPractice.metadata.passed > 0) {
      this.bestPractice.metadata.outcome = 'passed';
    } else {
      this.bestPractice.metadata.outcome = 'inapplicable';
      this.bestPractice.metadata.inapplicable = 1;
    }

    if (this.bestPractice.results.length > 0) {
      this.addDescription();
    }
  }

  private addDescription(): void {
    for (const result of this.bestPractice.results ?? []) {
      if (result.verdict === this.bestPractice.metadata.outcome) {
        this.bestPractice.metadata.description = <string>result.description;
        break;
      }
    }
  }
}

export { BestPractice };
