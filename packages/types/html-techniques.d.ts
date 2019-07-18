declare module '@qualweb/html-techniques' {
  import { DomElement } from 'htmlparser2';

  interface HTMLTOptions {
    techniques?: string[];
    levels?: string[];
    principles?: string[];
  }

  interface HTMLMetadata {
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
    url: string;
    passed: number;
    failed: number;
    notApplicable: number;
    type?: string[];
    a11yReq?: string[];
    outcome: 'passed' | 'failed' | 'warning' | 'notApplicable' | '';
    description: string;
  }

  interface HTMLResult {
    verdict: 'passed' | 'failed' | 'warning' | 'notApplicable' | '';
    description: string;
    pointer?: string;
    code?: string;
  }

  interface HTMLTechnique {
    name: string;
    code: string;
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