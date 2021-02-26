declare module "@qualweb/wcag-techniques" {
  import { QWPage } from "@qualweb/qw-page";

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
    outcome: "passed" | "failed" | "warning" | "inapplicable" | "";
    description: string;
  }

  interface WCAGTechniqueResult {
    verdict: "passed" | "failed" | "warning" | "inapplicable" | "";
    description: string[] | string | "";
    resultCode: string[] | string;
    elements?: WCAGElement[];
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
    public execute(page: QWPage): WCAGTechniquesReport;
  }

  export {
    WCAGOptions,
    WCAGTechniqueMetadata,
    WCAGTechniqueResult,
    WCAGMetadata,
    WCAGTechnique,
    WCAGTechniquesReport,
    WCAGTechniques,
  };
}
