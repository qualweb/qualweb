import type { EvaluationReport, ModuleOptions } from '@qualweb/common';
import { ModuleType } from '@qualweb/common';
import { ModuleTranslator, type Translate } from '@qualweb/locale';
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
    translate: Translate
  ): Promise<EvaluationReport> {
    return page.evaluate(
      (options: ModuleOptions) => {
        const translator = new ModuleTranslator(ModuleType.BEST_PRACTICES, translate);
        //@ts-expect-error The package exists inside the context of the WebPage
        return new BestPractices(translator).configure(options).test({}).getReport();
      },
      options
    );
  }
}
