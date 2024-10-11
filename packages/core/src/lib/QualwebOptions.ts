import { CrawlOptions } from '@qualweb/crawler';
import { LogOptions } from './LogOptions';
import { PageOptions } from './PageOptions';
import { TranslationOptions } from '@qualweb/locale';
import {
  ModuleType,
  ModuleOptions,
} from './evaluation';
import { PuppeteerLifeCycleEvent } from 'puppeteer';

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
  modulesToExecute?: Record<ModuleType, boolean>;
  modules?: Record<ModuleType, ModuleOptions>;
};