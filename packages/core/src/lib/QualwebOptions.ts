import { CrawlOptions } from '@qualweb/crawler';
import { LogOptions } from './LogOptions';
import { PageOptions } from './PageOptions';
import { TranslationOptions } from '@qualweb/locale';
import { PuppeteerLifeCycleEvent } from 'puppeteer';
import { ExecutableModuleContext } from './evaluation';

export type QualwebOptions = {
  url?: string;
  urls?: string[];
  file?: string;
  crawl?: string;
  html?: string;
  timeout?: number;
  maxParallelEvaluations?: number;
  log?: LogOptions;
  waitUntil?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[];
  viewport?: PageOptions;
  validator?: string;
  report?: 'earl' | 'earl-a';
  translate?: TranslationOptions;
  crawlOptions?: CrawlOptions;
  'save-name'?: string;
  /**
   * Array of modules to run for each URL in the configuration. See the
   * individual module's readme for specific usage, but it generally boils down
   * to passing a new instance of the module with a desired configuration.
   */
  modules: ExecutableModuleContext[];
};