declare module "@qualweb/core" {
  import { WCAGOptions, WCAGTechniquesReport } from "@qualweb/wcag-techniques";
  import { DomData } from "@qualweb/dom";
  import { CrawlOptions } from '@qualweb/crawler';
  import { WappalyzerReport, WappalyzerOptions } from "@qualweb/wappalyzer";
  import { ACTRulesReport, ACTROptions } from "@qualweb/act-rules";
  import { BestPracticesReport, BPOptions } from "@qualweb/best-practices";
  import { generateEARLReport } from "@qualweb/earl-reporter";
  import { LaunchOptions, BrowserLaunchArgumentOptions, BrowserConnectOptions } from "puppeteer";
  import { CounterReport } from "@qualweb/counter";

  interface Execute {
    wappalyzer?: boolean;
    act?: boolean;
    wcag?: boolean;
    bp?: boolean;
    counter?: boolean;
  }

  type LoadEvent = 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2';

  interface QualwebOptions {
    url?: string;
    urls?: string[];
    file?: string;
    crawl?: string;
    html?: string;
    waitUntil?: LoadEvent | LoadEvent[];
    viewport?: PageOptions;
    validator?: string;
    report?: "earl" | "earl-a";
    crawlOptions?: CrawlOptions
    "save-name"?: string;
    execute?: Execute;
    wappalyzer?: WappalyzerOptions;
    "act-rules"?: ACTROptions;
    "wcag-techniques"?: WCAGOptions;
    "best-practices"?: BPOptions;
  }

  interface Evaluator {
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
  }

  interface Url {
    inputUrl: string;
    protocol: string;
    domainName: string;
    domain: string;
    uri: string;
    completeUrl: string;
  }

  interface Metadata {
    passed: number;
    warning: number;
    failed: number;
    inapplicable: number;
  }

  interface Modules {
    wappalyzer?: WappalyzerReport;
    "act-rules"?: ACTRulesReport;
    "wcag-techniques"?: WCAGTechniquesReport;
    "best-practices"?: BestPracticesReport;
    counter?: CounterReport;
  }

  interface EvaluationReport {
    type: "evaluation";
    system: Evaluator;
    metadata: Metadata;
    modules: Modules;
  }

  interface PageOptions {
    mobile?: boolean;
    landscape?: boolean;
    userAgent?: string;
    resolution?: {
      width?: number;
      height?: number;
    };
  }

  type Module =
    | "wappalyzer"
    | "act-rules"
    | "wcag-techniques"
    | "best-practices"
    | "counter";

  interface Evaluations {
    [url: string]: EvaluationReport;
  }

  interface PuppeteerPlugins { 
    stealth?: boolean; 
    adBlock?: boolean;
  }

  interface ClusterOptions {
    maxConcurrency?: number; 
    timeout?: number; 
    monitor?: boolean;
  }

  class Cluster {}

  /**
   * QualWeb engine - Performs web accessibility evaluations using several modules:
   * - act-rules module (https://github.com/qualweb/act-rules)
   * - wcag-techniques module (https://github.com/qualweb/wcag-techniques)
   * - best-practices module (https://github.com/qualweb/best-practices)
   */
  class QualWeb {
    /**
     * Chromium browser cluster.
     */
    private cluster?: Cluster;

    /**
     * Initializes puppeteer with given plugins.
     * 
     * @param {PuppeteerPlugins} plugins - Plugins for puppeteer - supported: AdBlocker and Stealth.
     */
    constructor(plugins?: PuppeteerPlugins);

    /**
     * Starts chromium browser cluster.
     * 
     * @param {ClusterOptions} clusterOptions - Options for cluster initialization.
     * @param {LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions} options - check https://github.com/puppeteer/puppeteer/blob/v9.1.1/docs/api.md#puppeteerlaunchoptions.
     */
    public start(clusterOptions?: ClusterOptions, puppeteerOptions?: LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions): Promise<void>;

    /**
     * Closes chromium browser.
     */
    public stop(): Promise<void>;

    /**
     * Evaluates given options.
     *
     * @param {QualwebOptions} options - Options of execution (check https://github.com/qualweb/core#options).
     * @returns List of evaluations.
     */
    public evaluate(options: QualwebOptions): Promise<Evaluations>;

    /**
     * Crawls a domain to find all webpages urls.
     *
     * @param {string} domain - Web domain to crawl.
     * @param {CrawlOptions} options - Options for crawling process.
     * @returns List of decoded urls.
     */
    public crawlDomain(domain: string, options?: CrawlOptions): Promise<Array<string>>;

    /**
     * Checks possible input options and compiles the urls.
     * Possible input options are:
     * - url - single url;
     * - urls - multiple urls;
     * - filepath - path to file with urls;
     * - crawler - domain to crawl and gather urls.
     *
     * @param {QualwebOptions} options - QualWeb options.
     * @returns List of urls.
     */
    private checkUrls(options: QualwebOptions): Promise<Array<string>>;
  }

  /**
   * Reads a file to obtain the urls to evaluate.
   *
   * @param {string} file - Path to file of urls.
   * @returns List of decoded urls.
   */
  function getFileUrls(file: string): Promise<Array<string>>;

  export {
    QualwebOptions,
    Execute,
    EvaluationReport,
    Evaluator,
    Url,
    Metadata,
    Modules,
    Module,
    PageOptions,
    Evaluations,
    PuppeteerPlugins,
    ClusterOptions,
    QualWeb,
    getFileUrls,
    generateEARLReport,
  };
}
