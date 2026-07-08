import {
  CounterReport,
  EvaluationReport,
  ExecutableModuleContext,
  ModuleOptions,
  ModuleType,
  TestingData,
} from '@qualweb/core';
import type { TranslationOptions } from '@qualweb/locale';
import type { QualwebPage } from '@qualweb/core/lib';

type RunModuleCallback = (
  page: QualwebPage,
  options: ModuleOptions,
  translate: TranslationOptions,
  data: TestingData
) => Promise<EvaluationReport | CounterReport> | EvaluationReport | CounterReport;

/**
 * Dummy module used to exercise the driver through a full QualWeb
 * evaluation. Adapted from @qualweb/core's own test DummyModule. It injects
 * nothing into the page; the optional callback receives the live
 * QualwebPage so tests can poke at the driver mid-evaluation.
 */
export default class DummyModule extends ExecutableModuleContext {
  public readonly name: ModuleType = ModuleType.ACT_RULES;

  public static emptyReport(): EvaluationReport {
    return {
      type: ModuleType.ACT_RULES,
      metadata: {
        passed: 0,
        warning: 0,
        failed: 0,
        inapplicable: 0,
      },
      assertions: {},
    };
  }

  public constructor(
    moduleOptions?: ModuleOptions,
    private readonly runModuleCallback?: RunModuleCallback
  ) {
    super(moduleOptions);
  }

  protected getModulePackage = undefined;

  protected async runModule(
    page: QualwebPage,
    options: ModuleOptions,
    translate: TranslationOptions,
    data: TestingData
  ): Promise<EvaluationReport | CounterReport> {
    if (this.runModuleCallback) {
      return this.runModuleCallback(page, options, translate, data);
    }
    return DummyModule.emptyReport();
  }
}
