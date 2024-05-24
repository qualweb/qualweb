import { ModuleTranslator } from '@packages/locale/src';
import type { ModuleOptions, TestingData, EvaluationReport } from '../types';
import { Tester, ModuleReport } from '.';

export abstract class EvaluationModule {
  protected abstract readonly report: ModuleReport;
  protected abstract readonly tester: Tester;

  protected readonly translator: ModuleTranslator;

  constructor(translator: ModuleTranslator) {
    this.translator = translator;
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
