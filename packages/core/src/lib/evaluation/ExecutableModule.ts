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
 * This class represents an *INSTANCE* of an evaluation module that is meant to
 * run tests on an actual page.
 * CONTRAST this with {@link EvaluationModuleDefinition}, which represents the
 * overall definition and configuration of a module for an entire batch of URLs.
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

  protected abstract getModulePackage?(): string;
  protected abstract runModule(
    page: QualwebPage,
    options: ModuleOptions,
    translate: TranslationOptions,
    data: TestingData
  ): Promise<EvaluationReport | CounterReport>;
}
