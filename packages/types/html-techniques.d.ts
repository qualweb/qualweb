declare module '@qualweb/html-techniques' {
  import { DomElement } from 'htmlparser2';

  interface HTMLTOptions {
    techniques?: string[];
    levels?: string[];
    principles?: string[];
  }

  interface HTMLMetadata {
    target: {
      'parent-sibling'?: string;
      parent?: string;
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

  interface HTMLResult {
    verdict: 'passed' | 'failed' | 'warning' | 'inapplicable' | '';
    description: string | '';
    pointer?: string;
    code?: string | string[];
    attributes?: string | string[];
  }

  interface HTMLTechnique {
    name: string;
    code: string;
    mapping: string;
    description: string;
    metadata: HTMLMetadata;
    results: HTMLResult[];
  }

  interface HTMLTechniquesReport {
    type: 'html-techniques';
    techniques: {
      [technique: string]: HTMLTechnique;
    };
  }

  function configure(options: HTMLTOptions): void;
  function executeHTMLT(sourceHTML: DomElement[], processedHTML: DomElement[]): Promise<HTMLTechniquesReport>;

  export {
    HTMLTOptions,
    HTMLMetadata,
    HTMLResult,
    HTMLTechnique,
    HTMLTechniquesReport,
    configure,
    executeHTMLT
  };
}