import type { CounterReport } from '../lib/evaluation';
import { ModuleType } from '../lib/evaluation';
import type { QualwebPage } from '../lib';
import { Module } from './Module.object';

export class CounterModule extends ExecutableModuleContext {
  public readonly name = ModuleType.COUNTER;

  protected getModulePackage(): string {
    return '@qualweb/counter';
  }

  protected runModule(page: QualwebPage): Promise<CounterReport> {
    return page.evaluate(() => {
      //@ts-expect-error The package exists inside the context of the WebPage
      return window.executeCounter()
    });
  }
}
