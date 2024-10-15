import type { EvaluationReport, ModuleOptions, TestingData } from '../lib/evaluation';
import { ModuleType } from '../lib/evaluation';
import type { TranslationOptions } from '@qualweb/locale';
import type { QualwebPage } from '../lib';
import { Module } from './Module.object';

export class WCAGTechniquesModule extends ExecutableModuleContext {
  public readonly name = ModuleType.WCAG_TECHNIQUES;

  protected getModulePackage(): string {
    return '@qualweb/wcag-techniques';
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
        return new WCAGTechniques(translate).configure(options).test(data).getReport();
      },
      data,
      options,
      translate
    );
  }
}
