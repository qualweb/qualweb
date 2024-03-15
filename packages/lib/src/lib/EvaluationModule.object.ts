import type { Translate, TranslationOptions } from '@qualweb/locale';
import type { Technique } from '@qualweb/wcag-techniques';
import type { Rule } from '@qualweb/act-rules';
import type { BestPractice } from '@qualweb/best-practices';
import { ModuleReport } from './ModuleReport.object';
import { ModuleOptions, TestingData, EvaluationReport } from '.';
import { Tester } from './Tester.object';

export abstract class EvaluationModule<T extends Rule | Technique | BestPractice> {
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
