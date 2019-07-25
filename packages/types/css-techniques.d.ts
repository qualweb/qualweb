declare module '@qualweb/css-techniques' {
  import { DomElement } from 'htmlparser2';

  interface CSSTOptions {
    techniques?: string[];
    levels?: string[];
    principles?: string[];
  }

  interface CSSMetadata {
    target: {
      element?: string | string[];
      attributes?: string | string[];
      css?: string | string[];
    };
    'success-criteria': {
      name: string;
      level: string;
      principle: string;
    }[];
    related: string[];
    url: string | {
      [technique: string]: string;
    };
    passed: number;
    warning: number;
    failed: number;
    inapplicable: number;
    type?: string[];
    a11yReq?: string[];
    outcome: 'passed' | 'failed' | 'warning' | 'inapplicable' | '';
    description: string;
  }

  interface CSSResult {
    verdict: 'passed' | 'failed' | 'warning' | 'inapplicable' | '';
    description: string | '';
    pointer?: string;
    code?: string | string[];
    attributes?: string | string[];
  }

  interface CSSTechnique {
    name: string;
    code: string;
    mapping: string;
    description: string;
    metadata: CSSMetadata;
    results: CSSResult[];
  }

  interface CSSTechniquesReport {
    type: 'css-techniques';
    techniques: {
      [technique: string]: CSSTechnique;
    };
  }

  function configure(options: CSSTOptions): void;
  function executeCSST(sourceHTML: DomElement[], processedHTML: DomElement[]): Promise<CSSTechniquesReport>;

  export {
    CSSTOptions,
    CSSMetadata,
    CSSResult,
    CSSTechnique,
    CSSTechniquesReport,
    configure,
    executeCSST
  };
}