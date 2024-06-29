import type { CounterReport } from '@qualweb/common';
import { ModuleType } from '@qualweb/common';
import type { QualwebPage } from '../lib';
import { Module } from './Module.object';

export class CounterModule extends Module {
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
