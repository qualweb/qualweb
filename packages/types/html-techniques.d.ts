declare module '@qualweb/html-techniques' {
  import { Page } from 'puppeteer';
  import { Optimization } from '@qualweb/util';

  interface HTMLTOptions {
    techniques?: string[];
    levels?: string[];
    principles?: string[];
    optimize?: 'performance' | 'error-detection';
    htmlValidatorEndpoint?: string;
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
    accessibleName?: string;
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
    assertions: {
      [technique: string]: HTMLTechnique;
    };
  }

  function configure(options: HTMLTOptions): void;
  function resetConfiguration(): void;
  function executeHTMLT(page: Page): Promise<HTMLTechniquesReport>;

  class HTMLTechniques {
    private optimization: Optimization;
    private techniques: any;
    private techniquesToExecute: any;

    constructor(options?: HTMLTOptions);
    public configure(options: HTMLTOptions): void;
    public resetConfiguration(): void;
    private executeTechnique(technique: string, selector: string, page: Page, report: HTMLTechniquesReport): Promise<void>;
    private executeMappedTechniques(report: HTMLTechniquesReport, page: Page, selectors: string[], mappedTechniques: any): Promise<void>;
    private executeNotMappedTechniques(report: HTMLTechniquesReport, page: Page): Promise<void>;
    public execute(page: Page): Promise<HTMLTechniquesReport>;
  }

  export {
    HTMLTOptions,
    HTMLTechniqueMetadata,
    HTMLTechniqueResult,
    HTMLMetadata,
    HTMLTechnique,
    HTMLTechniquesReport,
    HTMLTechniques
  };
}
