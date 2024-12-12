import type {
  EvaluationReport,
  ModuleOptions,
  TestingData,
} from '@qualweb/core/evaluation';
import {
  ModuleType,
  ExecutableModuleContext,
} from '@qualweb/core/evaluation';
import type { TranslationOptions } from '@qualweb/locale';
import type { QualwebPage } from '@qualweb/core/lib';

export class CUIChecksModule extends ExecutableModuleContext {
  public readonly name = ModuleType.CUI_CHECKS;

  protected getModulePackage(): string {
    return '@qualweb/cui-checks';
  }

  protected runModule(
    page: QualwebPage,
    options: ModuleOptions,
    translate: TranslationOptions,
    data: TestingData
  ): Promise<EvaluationReport> {
    return page.evaluate(
      (data: TestingData, options: ModuleOptions, translate: TranslationOptions) => {
        //@ts-expect-error The package exists inside the context of the WebPage
        return new CUIChecksRunner(options, translate).configure(options).test(data).getReport();
      },
      data,
      options,
      translate
    );
  }
}
