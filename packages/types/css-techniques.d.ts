declare module '@qualweb/css-techniques' {
  import { Position } from 'css';
  import { CSSStylesheet } from '@qualweb/core';

  interface CSSTOptions {
    techniques?: string[];
    levels?: string[];
    principles?: string[];
  }

  interface CSSTechniqueMetadata {
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

  interface CSSTechniqueResult {
    verdict: 'passed' | 'failed' | 'warning' | 'inapplicable' | '';
    description: string | '';
    pointer?: string;
    htmlCode?: string | string[];
    attributes?: string | string[];
    cssCode?: string;
    stylesheetFile?: string;
    selector?: {
      value?: string;
      position?: Position;
    };
    property?: {
      name?: string;
      value?: string;
      position?: Position;
    };
  }

  interface CSSMetadata {
    passed: number;
    warning: number;
    failed: number;
    inapplicable: number;
  }

  interface CSSTechnique {
    name: string;
    code: string;
    mapping: string;
    description: string;
    metadata: CSSTechniqueMetadata;
    results: CSSTechniqueResult[];
  }

  interface CSSTechniquesReport {
    type: 'css-techniques';
    metadata: CSSMetadata;
    assertions: {
      [technique: string]: CSSTechnique;
    };
  }

  class CSSTechniques {
    private techniques: any;
    private techniquesToExecute: any;
    
    constructor(options?: CSSTOptions);
    public configure(options: CSSTOptions): void;
    public resetConfiguration(): void;
    private executeTechnique(report: CSSTechniquesReport, technique: string, styleSheets: CSSStylesheet[], mappedDOM: any): Promise<void>;
    private executeTechniques(report: CSSTechniquesReport, styleSheets: CSSStylesheet[], mappedDOM: any): Promise<void>;
    public execute(styleSheets: CSSStylesheet[], mappedDOM: any): Promise<CSSTechniquesReport>;
  }

  export {
    CSSTOptions,
    CSSTechniqueMetadata,
    CSSTechniqueResult,
    CSSMetadata,
    CSSTechnique,
    CSSTechniquesReport,
    CSSTechniques
  };
}