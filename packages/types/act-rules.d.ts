declare module '@qualweb/act-rules' {
  import { DomElement } from 'htmlparser2';
  import { CSSStylesheet } from '@qualweb/get-dom-puppeteer';

  interface ACTROptions {
    rules?: string[];
    levels?: string[];
    principles?: string[];
  }

  interface ACTRuleMetadata {
    target: {
      element?: string | string[];
      attributes?: string | string[];
      css?: string | string[];
    };
    'success-criteria': {
      name: string;
      level: string;
      principle: string;
      url: string;
    }[];
    related: string[];
    url: string;
    passed: number;
    warning: number;
    failed: number;
    inapplicable: number;
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
    code?: string;
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

  function resetConfiguration(): void;
  function configure(options: ACTROptions): void;
  function executeACTR(url: string, sourceHTML: DomElement[], processedHTML: DomElement[], stylesheets: CSSStylesheet[]): Promise<ACTRulesReport>;

  export {
    ACTROptions,
    ACTRuleMetadata,
    ACTRuleResult,
    ACTRule,
    ACTMetadata,
    ACTRulesReport,
    configure,
    executeACTR,
    resetConfiguration
  };
} 