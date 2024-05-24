import type { CounterReport, EvaluationReport, ModuleOptions, TestingData } from '@shared/types';
import { ModuleType } from '@shared/types';
import type { ModuleTranslator } from '@packages/locale/src';
import { QualwebPage } from '../lib';
import { Module } from '.';

export class WCAGTechniquesModule extends Module {
  public readonly name = ModuleType.WCAG_TECHNIQUES;

  protected getModulePackage(): string {
    return '@qualweb/wcag-techniques';
  }

  protected runModule(
    page: QualwebPage,
    options: ModuleOptions,
    translator: ModuleTranslator,
    data: TestingData
  ): Promise<EvaluationReport | CounterReport> {
    return page.evaluate(
      (translator: ModuleTranslator, data: TestingData, options: ModuleOptions) => {
        //@ts-expect-error The package exists inside the context of the WebPage
        return new WCAGTechniques(translator).configure(options).test(data).getReport();
      },
      translator,
      data,
      options
    );
  }
}
