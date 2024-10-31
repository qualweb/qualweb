import type { CounterReport } from '@qualweb/core/evaluation';
import { ExecutableModuleContext, ModuleType } from '@qualweb/core/evaluation';
import type { QualwebPage } from '@qualweb/core/lib';
import { executeCounter } from './executeCounter';

export class CounterModule extends ExecutableModuleContext {
  public readonly name = ModuleType.COUNTER;

  protected getModulePackage(): string {
    return '@qualweb/counter';
  }

  protected runModule(page: QualwebPage): Promise<CounterReport> {
    return page.evaluate(() => {
      return executeCounter();
    });
  }
}
