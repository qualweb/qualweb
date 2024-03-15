import type { CounterReport } from '@qualweb/counter';
import type { CrawlOptions } from '@qualweb/crawler';
import type { TranslationOptions } from '@qualweb/locale';
import { Page } from 'puppeteer';

export type Module = 'act-rules' | 'wcag-techniques' | 'best-practices';
export type Level = 'A' | 'AA' | 'AAA';
export type Principle = 'Perceivable' | 'Operable' | 'Understandable' | 'Robust';
export type Verdict = 'passed' | 'failed' | 'warning' | 'inapplicable';

export type ModuleOptions = {
  include?: string[];
  exclude?: string[];
  levels?: Level[];
  principles?: Principle[];
};

export type EvaluationElement = {
  pointer?: string;
  htmlCode?: string;
  accessibleName?: string;
  attributes?: string | string[];
  cssCode?: string;
  property?: {
    name?: string;
    value?: string;
  };
  stylesheetFile?: string;
  additional?: {
    [key: string]: string | number | boolean;
  };
};

export type TestResult = {
  verdict: Verdict;
  description: string;
  resultCode: string;
  elements: EvaluationElement[];
  attributes: string[];
};

export type TestingData = {
  newTabWasOpen?: boolean;
  sourceHtml?: string;
  validation?: HTMLValidationReport;
};

export type Execute = {
  act?: boolean;
  wcag?: boolean;
  bp?: boolean;
  counter?: boolean;
};

export type LoadEvent = 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2';

export type PageCallback = (page: Page, url: string) => Promise<void> | void;

/**
 * Basic interface for a Qualweb plugin. Plugins are useful when you need to
 * work on a page before letting Qualweb perform evaluation of its contents.
 */
export interface QualwebPlugin {
  /**
   * Called *after* a Page object has been initialized but *before* it loads
   * a target URL and injects Qualweb.
   * Use cases include injecting cookies before page loads, setting the
   * user agent prior to loading the target URL, and even subscribing to
   * console events for diagnostic/logging purposes.
   */
  beforePageLoad?: PageCallback;

  /**
   * Called *after* navigating to a URL that should be evaluated, but before
   * the evaluation itself has been run.
   * Use cases include dismissing banners/popups and adding timer delays to
   * slow-loading pages, to guarantee content has loading prior to Qualweb's
   * evaluation.
   */
  afterPageLoad?: PageCallback;
}

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

export type Evaluator = {
  name: string;
  description: string;
  version: string;
  homepage: string;
  date: string;
  hash: string;
  url?: Url;
  page: {
    viewport: {
      mobile?: boolean;
      landscape?: boolean;
      userAgent: string;
      resolution?: {
        width?: number;
        height?: number;
      };
    };
    dom: DomData;
  };
};

export type Url = {
  inputUrl: string;
  protocol: string;
  domainName: string;
  domain: string;
  uri: string;
  completeUrl: string;
};

export type Metadata = {
  passed: number;
  warning: number;
  failed: number;
  inapplicable: number;
};

export type Modules = {
  'act-rules'?: EvaluationReport;
  'wcag-techniques'?: EvaluationReport;
  'best-practices'?: EvaluationReport;
  counter?: CounterReport;
};

export type QualwebReport = {
  type: 'evaluation';
  system: Evaluator;
  metadata: Metadata;
  modules: Modules;
};

export type PageOptions = {
  mobile?: boolean;
  landscape?: boolean;
  userAgent?: string;
  resolution?: {
    width?: number;
    height?: number;
  };
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

export type DomData = {
  html: string;
  title?: string;
  elementCount?: number;
};

export type PageData = {
  sourceHtml: string;
  validation?: HTMLValidationReport;
};

export type ModuleMetadata = {
  passed: number;
  warning: number;
  failed: number;
  inapplicable: number;
};

export type SuccessCriteria = {
  name: string;
  level: Level;
  principle: Principle;
  url: string;
  url_tr: string;
};

export type AssertionMetadata = {
  target: {
    'parent-sibling'?: string;
    parent?: string | string[];
    element?: string | string[];
    children?: string | string[];
    attributes?: string | string[];
    css?: string | string[];
  };
  'success-criteria': SuccessCriteria[];
  related: string[];
  url: string;
  passed: number;
  warning: number;
  failed: number;
  inapplicable: number;
  type?: string[];
  a11yReq?: string[];
  outcome: Verdict;
  description: string;
};

export type Assertion = {
  name: string;
  code: string;
  mapping: string;
  description: string;
  metadata: AssertionMetadata;
  results: TestResult[];
};

export type EvaluationReport = {
  type: Module;
  metadata: ModuleMetadata;
  assertions: {
    [key: string]: Assertion;
  };
};

export type Message = {
  url: string;
  type: 'error' | 'info';
  subType?: 'warning';
  message: string;
  extract: string;
  firstColumn?: number;
  lastColumn?: number;
  hiliteLength?: number;
  hiliteStart?: number;
  lastLine?: number;
};

export type HTMLValidationReport = {
  messages: Message[];
};
