import type { ModuleType } from '@shared/types';
import type { QualwebPage } from '../lib';
import type { Module } from '.';
import { ACTRulesModule, WCAGTechniquesModule, BestPracticesModule, CounterModule } from '.';

export class ModuleFactory {
  private static readonly mapping = {
    'act-rules': ACTRulesModule,
    'wcag-techniques': WCAGTechniquesModule,
    'best-practices': BestPracticesModule,
    counter: CounterModule
  };

  public static createModule(name: ModuleType, page: QualwebPage): Module {
    return new this.mapping[name](page);
  }
}
