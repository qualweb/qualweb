import type { LocaleFetcher } from '@qualweb/locale';

declare global {
  interface Window {
    LocaleFetcher: typeof LocaleFetcher;
  }
}

export * from './EvaluationModule.object';
export * from './ModuleReport.object';
export * from './Tester.object';
export * from './Test.object';
export * from './Guideline.object';
