import type { CounterReport, EvaluationReport, ModuleOptions, TestingData, ModuleType } from '@qualweb/common';
import type { Translate } from '@qualweb/locale';
import type { QualwebPage } from '../lib';

export abstract class Module {
  public abstract readonly name: ModuleType;
  private readonly page: QualwebPage;

  constructor(page: QualwebPage) {
    this.page = page;
  }

  public async execute(
    options: ModuleOptions,
    translate: Translate,
    data: TestingData
  ): Promise<EvaluationReport | CounterReport> {
    const modulePackage = this.getModulePackage?.();
    if (modulePackage) {
      await this.page.addEvaluationScript(modulePackage);
    }
    return this.runModule(this.page, options, translate, data);
  }

  protected abstract getModulePackage?(): string;
  protected abstract runModule(
    page: QualwebPage,
    options: ModuleOptions,
    translate: Translate,
    data: TestingData
  ): Promise<EvaluationReport | CounterReport>;
}
