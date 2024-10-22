import type { Translate, TranslationOptions } from '@qualweb/locale';
import { LocaleFetcher } from '@qualweb/locale';
import { ModuleOptions } from './ModuleOptions';
import { TestingData } from './TestingData';
import { EvaluationReport } from './EvaluationReport';
import { ModuleReport } from './ModuleReport';
import { ModuleType } from './ModuleType';
import { Tester } from './Tester';
import { QualwebPage } from '../QualwebPage.object';
import { ExecutableModuleContext } from './ExecutableModule';

export abstract class EvaluationModuleDefinition<TesterT extends Tester = Tester> {
  protected readonly translate: Translate;

  constructor(
    protected readonly type: ModuleType,
    protected readonly moduleOptions: ModuleOptions, // TODO: how strictly do we want to control writability?
    translationOptions: TranslationOptions,
    protected readonly report: ModuleReport,
    protected readonly tester: TesterT,
  ) {
    this.translate = LocaleFetcher.transform(translationOptions);

    this.configure(moduleOptions);
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

  /**
   * Should return a module-specific {@link ExecutableModuleContext} instance,
   * fit for running the module's tests on a page.
   * - Replaces ModuleFactory.createModule() in intent.
   * - Is possibly unnecessary (it looks like this class in itself might be
   * sufficient without having to create "sub-instances" for single-page
   * executions).
   * @param page The actual page that will contain the contents to evaluate.
   */
  public abstract getInstance(page: QualwebPage): ExecutableModuleContext;
}
