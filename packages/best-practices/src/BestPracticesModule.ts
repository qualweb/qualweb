import type { EvaluationReport, ModuleOptions } from '@qualweb/core/evaluation';
import {
  ExecutableModuleContext,
  ModuleType,
} from '@qualweb/core/evaluation';
import type { TranslationOptions } from '@qualweb/locale';
import type { QualwebPage } from '@qualweb/core/lib';

export class BestPracticesModule extends ExecutableModuleContext {
  public readonly name = ModuleType.BEST_PRACTICES;

  protected getModulePackage(): string {
    return '@qualweb/best-practices';
  }

  protected runModule(
    page: QualwebPage,
    options: ModuleOptions,
    translate: TranslationOptions
  ): Promise<EvaluationReport> {
    return page.evaluate(
      (options: ModuleOptions, translate: TranslationOptions) => {
        //@ts-expect-error The package exists inside the context of the WebPage
        return new BestPractices(options, translate).configure(options).test({}).getReport();
      },
      options,
      translate
    );
  }
}
