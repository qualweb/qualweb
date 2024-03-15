import type { ModuleTranslator } from '@qualweb/locale';
import type { Rule } from '@qualweb/act-rules';
import type { Technique } from '@qualweb/wcag-techniques';
import type { BestPractice } from '@qualweb/best-practices';
import type { ModuleReport, TestingData, Level, Principle } from '.';

export abstract class Tester<T extends Rule | Technique | BestPractice> {
  protected readonly assertions: Map<string, T>;
  protected readonly toExecute: { [key: string]: boolean };

  protected readonly report: ModuleReport<T>;

  constructor(report: ModuleReport<T>) {
    this.report = report;
    this.assertions = new Map<string, T>();
    this.toExecute = {};
  }

  public configureByPrinciplesAndLevels(principles?: Principle[], levels?: Level[]): void {
    for (const [key, assertion] of this.assertions) {
      if (principles && principles.length !== 0) {
        if (levels && levels.length !== 0) {
          if (!assertion.hasPrincipleAndLevels(principles, levels)) {
            this.toExecute[key] = false;
          }
        } else if (!assertion.hasPrincipleAndLevels(principles, ['A', 'AA', 'AAA'])) {
          this.toExecute[key] = false;
        }
      } else if (
        levels &&
        levels.length !== 0 &&
        !assertion.hasPrincipleAndLevels(['Perceivable', 'Operable', 'Understandable', 'Robust'], levels)
      ) {
        this.toExecute[key] = false;
      }
    }
  }

  public configureIncluded(assertions?: string[]): void {
    if (this.assertions?.size !== 0) {
      const _assertions = assertions?.map((r) =>
        r.toLowerCase().startsWith('qw') ? r.toUpperCase().trim() : r.trim()
      );
      for (const [key, assertion] of this.assertions) {
        this.toExecute[key] = !!(
          _assertions?.includes(assertion.getCode()) || _assertions?.includes(assertion.getMapping())
        );
      }
    }
  }

  public configureExcluded(assertions?: string[]): void {
    if (assertions && assertions.length !== 0) {
      const _assertions = assertions.map((r) => (r.toLowerCase().startsWith('qw') ? r.toUpperCase().trim() : r.trim()));
      for (const [key, assertion] of this.assertions) {
        this.toExecute[key] =
          !_assertions.includes(assertion.getCode()) && !_assertions.includes(assertion.getMapping());
      }
    }
  }

  public resetConfiguration(): void {
    for (const key in this.toExecute ?? {}) {
      this.toExecute[key] = true;
    }
  }

  public abstract init(translator: ModuleTranslator): this;
  public abstract execute(data: TestingData): void;
}
