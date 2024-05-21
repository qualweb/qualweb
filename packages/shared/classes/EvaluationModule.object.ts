import type { Translate, TranslationOptions, ModuleOptions, TestingData, EvaluationReport } from '../types';
import { Tester, Guideline, ModuleReport } from '.';

export abstract class EvaluationModule<T extends Guideline> {
  protected abstract readonly report: ModuleReport<T>;
  protected abstract readonly tester: Tester<T>;

  protected readonly locale: Translate;

  constructor(options: TranslationOptions) {
    this.locale = window.LocaleFetcher.transform(options);
  }

  public configure(options: ModuleOptions): this {
    this.tester.resetConfiguration();
    this.tester.configureByPrinciplesAndLevels(options.principles, options.levels);
    this.tester.configureIncluded(options.include);
    this.tester.configureExcluded(options.exclude);
    return this;
  }

  public test(data: TestingData): this {
    this.tester.execute(data);
    return this;
  }

  public testSpecial(): this {
    throw new Error('Method not implemented.');
  }

  public getReport(): EvaluationReport {
    return this.report.getCopy();
  }
}
