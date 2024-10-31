import type { CounterReport } from '@qualweb/core/evaluation';
import { ExecutableModuleContext, ModuleType } from '@qualweb/core/evaluation';
import type { QualwebPage } from '@qualweb/core/lib';

export class CounterModule extends ExecutableModuleContext {
  public readonly name = ModuleType.COUNTER;

  protected getModulePackage(): string {
    return '@qualweb/counter';
  }

  protected runModule(page: QualwebPage): Promise<CounterReport> {
    return page.evaluate(() => {
      // @ts-expect-error executCounter should be defined in page's context.
      return executeCounter();
    });
  }
}
