declare module "@qualweb/wcag-techniques" {
  import { QWPage } from "@qualweb/qw-page";
  import { HTMLValidationReport } from "@qualweb/html-validator";

  interface WCAGOptions {
    techniques?: string[];
    exclude?: string[];
    levels?: string[];
    principles?: string[];
    htmlValidatorEndpoint?: string;
  }

  interface WCAGTechniqueMetadata {
    target: {
      "parent-sibling"?: string;
      parent?: string | string[];
      element?: string | string[];
      children?: string | string[];
      attributes?: string | string[];
      css?: string | string[];
    };
    "success-criteria": {
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
    outcome: "passed" | "failed" | "warning" | "inapplicable";
    description: string;
  }

  interface WCAGTechniqueResult {
    verdict: "passed" | "failed" | "warning" | "inapplicable";
    description: string[] | string;
    resultCode: string[] | string;
    elements: Array<WCAGElement>;
    attributes?: string | string[];
  }

  interface WCAGMetadata {
    passed: number;
    warning: number;
    failed: number;
    inapplicable: number;
  }
  interface WCAGElement {
    pointer?: string;
    htmlCode?: string;
    accessibleName?: string;
    attributes?: string | string[];
    cssCode?: string;
    property?: {
      name?: string;
      value?: string;
    };
    stylesheetFile?: string;
  }

  interface WCAGTechnique {
    name: string;
    code: string;
    mapping: string;
    description: string;
    metadata: WCAGTechniqueMetadata;
    results: WCAGTechniqueResult[];
  }

  interface WCAGTechniquesReport {
    type: "wcag-techniques";
    metadata: WCAGMetadata;
    assertions: {
      [technique: string]: WCAGTechnique;
    };
  }

  class WCAGTechniques {
    private techniques: any;
    private techniquesToExecute: any;

    constructor(options?: WCAGOptions);
    public configure(options: WCAGOptions): void;
    public resetConfiguration(): void;
    private executeTechnique(
      technique: string,
      selector: string,
      page: QWPage,
      report: WCAGTechniquesReport
    ): void;
    private executeMappedTechniques(
      report: WCAGTechniquesReport,
      page: QWPage,
      selectors: string[],
      mappedTechniques: any
    ): void;
    private executeNotMappedTechniques(
      report: WCAGTechniquesReport,
      page: QWPage
    ): void;
    public execute(page: QWPage, newTabWasOpen: boolean, validation: HTMLValidationReport): WCAGTechniquesReport;
  }

  export {
    WCAGOptions,
    WCAGTechniqueMetadata,
    WCAGTechniqueResult,
    WCAGElement,
    WCAGMetadata,
    WCAGTechnique,
    WCAGTechniquesReport,
    WCAGTechniques,
  };
}
