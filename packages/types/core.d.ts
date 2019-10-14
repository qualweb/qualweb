declare module '@qualweb/core' {
  import { Dom } from '@qualweb/get-dom-puppeteer';
  import { WappalyzerReport, WappalyzerOptions } from '@qualweb/wappalyzer';
  import { ACTRulesReport, ACTROptions } from '@qualweb/act-rules';
  import { CSSTechniquesReport, CSSTOptions } from '@qualweb/css-techniques';
  import { HTMLTechniquesReport, HTMLTOptions } from '@qualweb/html-techniques';
  import { BestPracticesReport } from '@qualweb/best-practices';
  import { EarlOptions, EarlReport } from '@qualweb/earl-reporter';

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