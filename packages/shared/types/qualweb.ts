import type { CrawlOptions, ModuleOptions, ModuleType, QualwebReport, TranslationOptions } from '.';

export type ModulesToExecute = {
  [module in ModuleType]: boolean;
};

export type LoadEvent = 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2';

export type PageOptions = {
  mobile?: boolean;
  landscape?: boolean;
  touch?: boolean;
  userAgent?: string;
  resolution?: {
    width?: number;
    height?: number;
  };
};

export type LogOptions = {
  console?: boolean;
  file?: boolean;
};

export type QualwebOptions = {
  url?: string;
  urls?: string[];
  file?: string;
  crawl?: string;
  html?: string;
  timeout?: number;
  maxParallelEvaluations?: number;
  log?: LogOptions;
  waitUntil?: LoadEvent | LoadEvent[];
  viewport?: PageOptions;
  validator?: string;
  report?: 'earl' | 'earl-a';
  translate?: TranslationOptions;
  crawlOptions?: CrawlOptions;
  'save-name'?: string;
  modulesToExecute?: ModulesToExecute;
  modules?: {
    [module in ModuleType]: ModuleOptions;
  };
};

export type QualwebReports = {
  [url: string]: QualwebReport;
};

export type PuppeteerPlugins = {
  stealth?: boolean;
  adBlock?: boolean;
};

export type ClusterOptions = {
  maxConcurrency?: number;
  timeout?: number;
  monitor?: boolean;
};
