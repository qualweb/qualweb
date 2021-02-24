<<<<<<< Updated upstream
declare module '@qualweb/core' {
  import { Dom } from '@qualweb/get-dom-puppeteer';
  import { WappalyzerReport, WappalyzerOptions } from '@qualweb/wappalyzer';
  import { ACTRulesReport, ACTROptions } from '@qualweb/act-rules';
  import { CSSTechniquesReport, CSSTOptions } from '@qualweb/css-techniques';
  import { HTMLTechniquesReport, HTMLTOptions } from '@qualweb/html-techniques';
  import { BestPracticesReport } from '@qualweb/best-practices';
  import { EarlOptions, EarlReport } from '@qualweb/earl-reporter';

=======
declare module "@qualweb/core" {
  import { WCAGOptions, WCAGTechniquesReport } from "@qualweb/wcag-techniques";
  import { Node } from "domhandler";
  import { WappalyzerReport, WappalyzerOptions } from "@qualweb/wappalyzer";
  import { ACTRulesReport, ACTROptions } from "@qualweb/act-rules";
  import { BestPracticesReport, BPOptions } from "@qualweb/best-practices";
  import { EarlOptions, EarlReport } from "@qualweb/earl-reporter";
  import { LaunchOptions, Browser } from "puppeteer";
  import { CounterReport} from '@qualweb/counter'
	
>>>>>>> Stashed changes
  interface QualwebOptions {
    url?: string;
    urls?: string[];
    file?: string;
    crawl?: string;
    mobile?: boolean;
    landscape?: boolean;
    resolution?: {
      width?: number;
      height?: number;
    };
    force?: boolean;
    execute?: {
      wappalyzer?: boolean;
      act?: boolean;
      html?: boolean;
      css?: boolean;
      bp?: boolean;
      counter?: boolean;	
    };
    'wappalyzer'?: WappalyzerOptions;
    'act-rules'?: ACTROptions;
    'html-techniques'?: HTMLTOptions;
    'css-techniques'?: CSSTOptions; 
  }

  interface Url {
    readonly inputUrl: string;
    readonly protocol: string;
    readonly domainName: string;
    readonly domain: string;
    readonly uri: string;
    readonly completeUrl: string;
  }

  interface Metadata {
    passed: number;
    warning: number;
    failed: number;
    inapplicable: number;
  }

<<<<<<< Updated upstream
=======
  interface Modules {
    wappalyzer?: WappalyzerReport;
    "act-rules"?: ACTRulesReport;
    "wcag-techniques"?: WCAGTechniquesReport;
    "best-practices"?: BestPracticesReport;
    "counter"?: CounterReport;
  }

>>>>>>> Stashed changes
  interface EvaluationReport {
    type: 'evaluation';
    system: {
      name: string;
      description: string;
      version: string;
      homepage: string;
      date: string;
      hash: string;
      url: Url;
      dom?: Dom;
    };
    metadata: Metadata;
    modules: {
      'wappalyzer'?: WappalyzerReport;
      'act-rules'?: ACTRulesReport;
      'html-techniques'?: HTMLTechniquesReport;
      'css-techniques'?: CSSTechniquesReport;
      'best-practices'?: BestPracticesReport;
    };
<<<<<<< Updated upstream
=======
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
    | "best-practices";
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
      modulesToExecute: any
    ): Promise<void>;
>>>>>>> Stashed changes
  }

  function evaluate(options: QualwebOptions): Promise<EvaluationReport[]>;
  function generateEarlReport(options?: EarlOptions): Promise<EarlReport[]>;

  export {
    QualwebOptions,
    EvaluationReport,
    Url,
    Metadata,
    evaluate,
    generateEarlReport
  };
}