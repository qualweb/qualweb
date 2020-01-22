declare module '@qualweb/act-rules' {
  import { Page } from 'puppeteer';
  import { CSSStylesheet, SourceHtml } from '@qualweb/core';

  interface ACTROptions {
    rules?: string[];
    levels?: string[];
    principles?: string[];
    optimize?: 'performance' | 'error-detection';
  }

  interface SuccessCriteria {
    name: string;
    level: string;
    principle: string;
    url: string;
  }

  interface ACTRuleMetadata {
    target: any;
    'success-criteria': SuccessCriteria[];
    related: string[];
    url: string;
    passed: number;
    warning: number;
    failed: number;
    type?: string[];
    a11yReq?: string[];
    outcome: 'passed' | 'failed' | 'warning' | 'inapplicable' | '';
    description: string;
  }

  interface ACTRuleResult {
    verdict: 'passed' | 'failed' | 'warning' | 'inapplicable' | '';
    description: string | '';
    resultCode: string | '';
    pointer?: string;
    htmlCode?: string;
    attributes?: string | string[];
  }

  interface ACTRule {
    name: string;
    code: string;
    mapping: string;
    description: string;
    metadata: ACTRuleMetadata;
    results: ACTRuleResult[];
  }

  interface ACTMetadata {
    passed: number;
    warning: number;
    failed: number;
    inapplicable: number;
  }

  interface ACTRulesReport {
    type: 'act-rules';
    metadata: ACTMetadata;
    rules: {
      [rule: string]: ACTRule;
    };
  }

  class ACTRules {
    private rules: any;
    private rulesToExecute: any;

    constructor(options?: ACTROptions);
    public configure(options: ACTROptions): void;
    public resetConfiguration(): void;
    private executeSourceHtmlMappedRules(report: ACTRulesReport, html: SourceHtml, selectors: string[], mappedRules: any): Promise<void>;
    private executeRule(rule: string, selector: string, page: Page, report: ACTRulesReport, concurrent: boolean): Promise<void>;
    private executePageMappedRules(report: ACTRulesReport, page: Page, selectors: string[], mappedRules: any, concurrent: boolean): Promise<void>;
    private executeNotMappedRules(report: ACTRulesReport, stylesheets: any[]): Promise<void>;
    private executeNonConcurrentRules(report: ACTRulesReport, html: SourceHtml, page: Page): Promise<void>;
    private executeConcurrentRules(report: ACTRulesReport, html: SourceHtml, page: Page): Promise<void>;
    public execute(sourceHtml: SourceHtml, page: Page, stylesheets: any[]): Promise<ACTRulesReport>;
  }

  export {
    ACTROptions,
    SuccessCriteria,
    ACTRuleMetadata,
    ACTRuleResult,
    ACTRule,
    ACTMetadata,
    ACTRulesReport,
    ACTRules
  };
} 
