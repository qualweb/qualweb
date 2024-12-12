import type {
  CounterReport,
  EvaluationReport,
  ModuleOptions,
  TestingData,
  ModuleType,
} from '.';
import type { TranslationOptions } from '@qualweb/locale';
import type { QualwebPage } from '..';

/**
 * This class is responsible for executing an evaluation module on a Puppeteer
 * page. Separate modules (ACT-Rules, WCAG-techniques, etc) extend this class
 * with module-specific steps for evaluation.
 * CONTRAST this with {@link EvaluationModuleDefinition}, which represents
 * the overall definition of a module as well as its in-page execution. Where
 * this class runs outside of Puppeteer, {@link EvaluationModuleDefinition}s run
 * within a page's context.
 */
export abstract class ExecutableModuleContext {
  public abstract readonly name: ModuleType;

  constructor(public readonly options: ModuleOptions = {})
    {}

  public async execute(
    page: QualwebPage,
    translate: TranslationOptions,
    data: TestingData
  ): Promise<EvaluationReport | CounterReport> {
    const modulePackage = this.getModulePackage?.();
    if (modulePackage) {
      await page.addEvaluationScript(modulePackage);
    }
    return this.runModule(page, this.options, translate, data);
  }

  /**
   * Should return the name of the NPM/node package that contains this module's
   * code. Used to determine the path to the JS bundle when injecting code into
   * pages.
   */
  protected abstract getModulePackage?(): string;

  /**
   * When called, should perform the actual evaluation portion of the module.
   * @param page Page context that the module should run in.
   * @param options Configuration for running the module. This includes stuff
   * like include/exclude lists for rules.
   * @param translate Localization settings.
   * @param data Additional contextual information about the execution context.
   */
  protected abstract runModule(
    page: QualwebPage,
    options: ModuleOptions,
    translate: TranslationOptions,
    data: TestingData
  ): Promise<EvaluationReport | CounterReport>;
}
