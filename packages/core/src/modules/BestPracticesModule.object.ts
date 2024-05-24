import type { EvaluationReport, ModuleOptions } from '@shared/types';
import { ModuleType } from '@shared/types';
import type { ModuleTranslator } from '@packages/locale/src';
import type { QualwebPage } from '../lib';
import { Module } from '.';

export class BestPracticesModule extends Module {
  public readonly name = ModuleType.BEST_PRACTICES;

  protected getModulePackage(): string {
    return '@qualweb/best-practices';
  }

  protected runModule(
    page: QualwebPage,
    options: ModuleOptions,
    translator: ModuleTranslator
  ): Promise<EvaluationReport> {
    return page.evaluate(
      (translator: ModuleTranslator, options: ModuleOptions) => {
        //@ts-expect-error The package exists inside the context of the WebPage
        return new BestPractices(translator).configure(options).test({}).getReport();
      },
      translator,
      options
    );
  }
}
