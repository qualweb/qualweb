declare module '@qualweb/html-techniques' {
  import { Page } from 'puppeteer';

  interface HTMLTOptions {
    techniques?: string[];
    levels?: string[];
    principles?: string[];
  }

  interface HTMLTechniqueMetadata {
    target: {
      'parent-sibling'?: string;
      parent?: string | string[];
      element?: string | string[];
      children?: string | string[];
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
    type?: string[];
    a11yReq?: string[];
    outcome: 'passed' | 'failed' | 'warning' | 'inapplicable' | '';
    description: string;
  }

  interface HTMLTechniqueResult {
    verdict: 'passed' | 'failed' | 'warning' | 'inapplicable' | '';
    description: string[] | string | '';
    resultCode: string[] | string;
    pointer?: string;
    htmlCode?: string | string[];
    attributes?: string | string[];
  }

  interface HTMLMetadata {
    passed: number;
    warning: number;
    failed: number;
    inapplicable: number;
  }

  interface HTMLTechnique {
    name: string;
    code: string;
    mapping: string;
    description: string;
    metadata: HTMLTechniqueMetadata;
    results: HTMLTechniqueResult[];
  }

  interface HTMLTechniquesReport {
    type: 'html-techniques';
    metadata: HTMLMetadata;
    techniques: {
      [technique: string]: HTMLTechnique;
    };
  }

  function configure(options: HTMLTOptions): void;
  function resetConfiguration(): void;
  function executeHTMLT(page: Page): Promise<HTMLTechniquesReport>;

  export {
    HTMLTOptions,
    HTMLTechniqueMetadata,
    HTMLTechniqueResult,
    HTMLMetadata,
    HTMLTechnique,
    HTMLTechniquesReport,
    configure,
    resetConfiguration,
    executeHTMLT
  };
}
