import type { CrawlOptions, HTMLValidationReport, ModuleOptions, QualwebReport, TranslationOptions } from '.';

export type Execute = {
  act?: boolean;
  wcag?: boolean;
  bp?: boolean;
  counter?: boolean;
};

export type LoadEvent = 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2';

export type PageOptions = {
  mobile?: boolean;
  landscape?: boolean;
  userAgent?: string;
  resolution?: {
    width?: number;
    height?: number;
  };
};

export type QualwebOptions = {
  url?: string;
  urls?: string[];
  file?: string;
  crawl?: string;
  html?: string;
  timeout?: number;
  maxParallelEvaluations?: number;
  log?: {
    console?: boolean;
    file?: boolean;
  };
  waitUntil?: LoadEvent | LoadEvent[];
  viewport?: PageOptions;
  validator?: string;
  report?: 'earl' | 'earl-a';
  translate?: TranslationOptions;
  crawlOptions?: CrawlOptions;
  'save-name'?: string;
  execute?: Execute;
  'act-rules'?: ModuleOptions;
  'wcag-techniques'?: ModuleOptions;
  'best-practices'?: ModuleOptions;
};

export type Evaluations = {
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

export type PageData = {
  sourceHtml: string;
  validation?: HTMLValidationReport;
};
