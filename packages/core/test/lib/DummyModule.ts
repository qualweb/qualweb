import {
  CounterReport,
  EvaluationReport,
  ExecutableModuleContext,
  ModuleOptions,
  ModuleType,
  TestingData,
} from '../../src';
import { TranslationOptions } from '@qualweb/locale';
import { QualwebPage } from '../../src/lib';

/**
 * Utility type that resolves the return type of a function to "unwrap"
 * a Promise. Given (arg1: string, arg2: number) => Promise<boolean>, it
 * will return (arg1: string, arg2: number) => boolean.
 */
type ResolvedFunction<T> = T extends (...args: infer A) => Promise<infer R> ? (...args: A) => R : T;

/**
 * Dummy module used in core tests. It doesn't run anything in the browser, and
 * returns a fixed report ({@link DummyModule.report}).
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

  /**
   * 
   * @param moduleOptions Module options, as passed to any module.
   * @param runModuleCallback Optional callback to run instead of built-in
   * {@link runModule}. By default, will return an empty report.
   */
  public constructor(moduleOptions?: ModuleOptions, private runModuleCallback?: ResolvedFunction<ExecutableModuleContext['runModule']>) {
    super(moduleOptions);
  }

  protected getModulePackage = undefined;

  protected runModule(
    _page: QualwebPage,
    _options: ModuleOptions,
    _translate: TranslationOptions,
    _data: TestingData,
  ): Promise<EvaluationReport | CounterReport> {
    if (this.runModuleCallback) {
      return Promise.resolve(this.runModuleCallback(_page, _options, _translate, _data));
    } else {
      return Promise.resolve(DummyModule.emptyReport());
    }
  }
}