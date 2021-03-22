declare module "@qualweb/core" {
  import { WCAGOptions, WCAGTechniquesReport } from "@qualweb/wcag-techniques";
  import { Node } from "domhandler";
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
    r?: "earl" | "earl-a";
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

    title?: string;
    elementCount?: number;
  }

  interface SourceHtml {
    html: {
      plain: string;
      parsed?: Node[];
    };
    title?: string;
    elementCount?: number;
  }

  interface ProcessedHtml {
    html: {
      plain: string;
    };
    title?: string;
    elementCount?: number;
  }

  interface DomData {
    source: SourceHtml;
    processed: ProcessedHtml;
  }

  type Module =
    | "wappalyzer"
    | "act-rules"
    | "wcag-techniques"
    | "best-practices"
    | "counter";

  class QualWeb {
    private browser: Browser | null;
    public start(options?: LaunchOptions): Promise<void>;
    public evaluate(
      options: QualwebOptions
    ): Promise<{ [url: string]: EvaluationReport }>;
    public stop(): Promise<void>;
    private runModules(
      evaluations: any,
      url: string,
      html: string | undefined,
      options: QualwebOptions,
      modulesToExecute: Execute
    ): Promise<void>;
  }

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
    SourceHtml,
    ProcessedHtml,
    DomData,
    QualWeb,
    generateEARLReport,
  };
}
