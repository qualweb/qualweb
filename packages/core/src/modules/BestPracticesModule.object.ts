import type { EvaluationReport, ModuleOptions } from '../lib/evaluation';
import { ModuleType } from '../lib/evaluation';
import type { TranslationOptions } from '@qualweb/locale';
import type { QualwebPage } from '../lib';
import { Module } from './Module.object';

export class BestPracticesModule extends Module {
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
        return new BestPractices(translate).configure(options).test({}).getReport();
      },
      options,
      translate
    );
  }
}
