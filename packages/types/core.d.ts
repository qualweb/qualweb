declare module '@qualweb/core' {
  import { Dom } from '@qualweb/get-dom-puppeteer';
  import { WappalyzerReport, WappalyzerOptions } from '@qualweb/wappalyzer';
  import { ACTRulesReport, ACTROptions } from '@qualweb/act-rules';
  import { CSSTechniquesReport, CSSTOptions } from '@qualweb/css-techniques';
  import { HTMLTechniquesReport, HTMLTOptions } from '@qualweb/html-techniques';
  import { EarlOptions, EarlReport } from '@qualweb/earl-reporter';

  interface QualwebOptions {
    [option: string]: any;
    url?: string;
    urls?: string[];
    file?: string;
    mobile?: boolean;
    landscape?: boolean;
    resolution?: {
      width?: number;
      height?: number;
    };
    'wappalyzer'?: boolean | WappalyzerOptions;
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
    modules: {
      'wappalyzer'?: WappalyzerReport;
      'act-rules'?: ACTRulesReport;
      'html-techniques'?: HTMLTechniquesReport;
      'css-techniques'?: CSSTechniquesReport;
    };
  }

  function evaluate(options: QualwebOptions): Promise<EvaluationReport | EvaluationReport[]>;
  function generateEarlReport(options?: EarlOptions): Promise<EarlReport | EarlReport[]>;

  export {
    QualwebOptions,
    EvaluationReport,
    Url,
    evaluate,
    generateEarlReport
  };
}