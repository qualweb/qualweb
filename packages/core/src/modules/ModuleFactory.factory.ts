import type { ModuleType } from '../lib/evaluation';
import type { QualwebPage } from '../lib';
import type { Module } from './Module.object';
import { ACTRulesModule } from './ACTRulesModule.object';
import { WCAGTechniquesModule } from './WCAGTechniquesModule.object';
import { BestPracticesModule } from './BestPracticesModule.object';
import { CounterModule } from './CounterModule.object';

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
