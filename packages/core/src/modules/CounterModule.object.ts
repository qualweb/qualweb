import type { CounterReport } from '@shared/types';
import { ModuleType } from '@shared/types';
import type { QualwebPage } from '../lib';
import { Module } from '.';

export class CounterModule extends Module {
  public readonly name = ModuleType.COUNTER;

  protected getModulePackage(): string {
    return '@qualweb/counter';
  }

  protected runModule(page: QualwebPage): Promise<CounterReport> {
    return page.evaluate(() => window.executeCounter());
  }
}
