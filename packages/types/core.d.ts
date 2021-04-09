declare module "@qualweb/core" {
  import { WCAGOptions, WCAGTechniquesReport } from "@qualweb/wcag-techniques";
  import { DomData } from "@qualweb/dom";
  import { CrawlOptions } from '@qualweb/crawler';
  import { WappalyzerReport, WappalyzerOptions } from "@qualweb/wappalyzer";
  import { ACTRulesReport, ACTROptions } from "@qualweb/act-rules";
  import { BestPracticesReport, BPOptions } from "@qualweb/best-practices";
  import { generateEARLReport } from "@qualweb/earl-reporter";
  import { LaunchOptions, Browser, LoadEvent } from "puppeteer";
  import { CounterReport } from "@qualweb/counter";

  interface Execute {
    wappalyzer?: boolean;
    act?: boolean;
    wcag?: boolean;
    bp?: boolean;
    counter?: boolean;
  }

  interface QualwebOptions {
    url?: string;
    urls?: string[];
    file?: string;
    crawl?: string;
    html?: string;
    timeout?: number;
    waitUntil?: LoadEvent | LoadEvent[];
    viewport?: PageOptions;
    maxParallelEvaluations?: number;
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

  class QualWeb {
    private browser: Browser | null;

    /**
     * Opens chromium browser
     * @param {LaunchOptions} options - check https://github.com/puppeteer/puppeteer/blob/v8.0.0/docs/api.md#puppeteerlaunchoptions
     */
    public start(options?: LaunchOptions): Promise<void>;

    /**
     * Evaluates given options
     *
     * @param {QualwebOptions} options - options of execution (check https://github.com/qualweb/core#options)
     * @returns list of evaluations
     */
    public evaluate(options: QualwebOptions): Promise<Evaluations>;

    /**
     * Closes chromium browser
     */
    public stop(): Promise<void>;

    /**
     * Checks possible input options and compiles the urls.
     * Possible input options are:
     * - url - single url
     * - urls - multiple urls
     * - file - file with urls
     * - crawler - domain to crawl and gather urls
     *
     * @param {QualwebOptions} options -
     * @returns list of urls
     */
    private checkUrls(options: QualwebOptions): Promise<Array<string>>;

    /**
     * Executes defined modules on the given url or html code and saves the evaluation on the list of evaluations.
     *
     * @param {Evaluations} evaluations - list of evaluations
     * @param {string} url - url to be evaluated
     * @param {string | undefined} html - html code to be evaluated (optional)
     * @param {QualwebOptions} options - options of execution (check https://github.com/qualweb/core#options)
     * @param {Execute} modulesToExecute - modules to execute (act, wcag, best-practices, wappalyzer, counter)
     */
    private runModules(
      evaluations: any,
      url: string,
      html: string | undefined,
      options: QualwebOptions,
      modulesToExecute: Execute
    ): Promise<void>;
  }

  /**
   * Reads a file to obtain the urls to evaluate
   *
   * @param {string} file - path to file of urls
   * @returns list of decoded urls
   */
  function getFileUrls(file: string): Promise<Array<string>>;

  /**
   * Crawls a domain to find all webpages urls
   *
   * @param {string} domain - web domain to crawl
   * @returns list of decoded urls
   */
  function crawlDomain(domain: string): Promise<Array<string>>;

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
    QualWeb,
    getFileUrls,
    crawlDomain,
    generateEARLReport,
  };
}
