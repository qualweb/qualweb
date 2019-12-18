declare module '@qualweb/core' {
  import { DomElement } from 'htmlparser2';
  import { Stylesheet } from 'css';
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
    viewport?: PageOptions;
    maxParallelEvaluations?: number;
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
      dom: Dom;
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

  interface PageOptions {
    mobile?: boolean;
    landscape?: boolean;
    userAgent?: string;
    resolution?: {
      width?: number;
      height?: number;
    };
  }

  interface SourceHtml {
    html: {
      plain: string;
      parsed: DomElement[];
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

  interface CSSStylesheet {
    file: string;
    content?: {
      plain?: string;
      parsed?: StyleSheet;
    };
  }

  interface Dom {
    source: SourceHtml;
    processed: ProcessedHtml;
    stylesheets: CSSStylesheet[];
  }

  function evaluate(options: QualwebOptions): Promise<EvaluationReport[]>;
  function generateEarlReport(options?: EarlOptions): Promise<EarlReport[]>;

  export {
    QualwebOptions,
    EvaluationReport,
    Url,
    Metadata,
    PageOptions,
    SourceHtml,
    ProcessedHtml,
    Dom,
    CSSStylesheet,
    evaluate,
    generateEarlReport
  };
}