declare module '@qualweb/html-techniques' {
  import { Optimization } from '@qualweb/util';
  import { QWPage } from "@qualweb/qw-page";


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
  function executeHTMLT(page: QWPage): Promise<HTMLTechniquesReport>;

  class HTMLTechniques {
    private optimization: Optimization;
    private techniques: any;
    private techniquesToExecute: any;

    constructor(options?: HTMLTOptions);
    public configure(options: HTMLTOptions): void;
    public resetConfiguration(): void;
    private executeTechnique(technique: string, selector: string, page: QWPage, report: HTMLTechniquesReport): void;
    private executeMappedTechniques(report: HTMLTechniquesReport, page: QWPage, selectors: string[], mappedTechniques: any): void;
    private executeNotMappedTechniques(report: HTMLTechniquesReport, page: QWPage): void;
    public execute(page: QWPage): HTMLTechniquesReport;
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
