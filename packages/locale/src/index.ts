import { Translator } from './translator';
import { TestTranslator } from './test-translator';
import { ModuleTranslator } from './module-translator';
import { ReportTranslator } from './report-translator';
import { AssertionTranslator } from './assertion-translator';
import { LocaleFetcher } from './locale-fetcher';

declare global {
  interface Window {
    TestTranslator: typeof TestTranslator;
    AssertionTranslator: typeof AssertionTranslator;
    ModuleTranslator: typeof ModuleTranslator;
    LocaleFetcher: typeof LocaleFetcher;
  }
}

export { Translator, TestTranslator, ModuleTranslator, ReportTranslator, AssertionTranslator, LocaleFetcher };
