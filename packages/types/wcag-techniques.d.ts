declare module "@qualweb/wcag-techniques" {
  import { QWElement } from "@qualweb/qw-element";
  import { HTMLValidationReport } from "@qualweb/html-validator";

  interface WCAGOptions {
    techniques?: string[];
    exclude?: string[];
    levels?: string[];
    principles?: string[];
    htmlValidatorEndpoint?: string;
  }

  interface SuccessCriteria {
    name: string;
    level: string;
    principle: string;
    url: string;
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
    "success-criteria": SuccessCriteria[];
    related: string[];
    url: string;
    passed: number;
    warning: number;
    failed: number;
    inapplicable: number;
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

  interface WCAGTechniqueMapping {
    [selector: string]: Array<string>;
  }

  interface WCAGTechniquesReport {
    type: "wcag-techniques";
    metadata: WCAGMetadata;
    assertions: {
      [technique: string]: WCAGTechnique;
    };
  }

  class Test implements WCAGTechniqueResult {
    verdict: 'passed' | 'failed' | 'warning' | 'inapplicable';
    description: string | string[];
    resultCode: string | string[];
    elements: WCAGElement[];
    attributes?: string | string[] | undefined;

    constructor(verdict?: 'passed' | 'failed' | 'warning', description?: string, resultCode?: string);

    public addElement(element: QWElement, withText: boolean, fullElement: boolean): void;
  }

  abstract class Technique {
    private readonly technique: WCAGTechnique;

    constructor(technique: WCAGTechnique);

    public getTechniqueMapping(): string;

    public hasPrincipleAndLevels(principles: Array<string>, levels: Array<string>): boolean;

    protected getNumberOfWarningResults(): number;

    protected getNumberOfFailedResults(): number;

    protected addTestResult(result: Test): void;

    abstract execute(element: QWElement | undefined): void;

    public getFinalResults(): WCAGTechnique;

    private outcomeTechnique(): void;

    private addDescription(): void;
  }

  class WCAGTechniques {
    private readonly techniques: { [technique: string]: Technique };
    private readonly techniquesToExecute: { [technique: string]: boolean };

    constructor(options?: WCAGOptions);
    public configure(options: WCAGOptions): void;
    public resetConfiguration(): void;
    private executeTechnique(
      technique: string,
      selector: string,
      report: WCAGTechniquesReport
    ): void;
    private executeMappedTechniques(report: WCAGTechniquesReport): void;
    private executeNotMappedTechniques(report: WCAGTechniquesReport): void;
    public execute(newTabWasOpen: boolean, validation: HTMLValidationReport): WCAGTechniquesReport;
  }

  export {
    WCAGOptions,
    WCAGTechniqueMetadata,
    WCAGTechniqueResult,
    WCAGElement,
    WCAGMetadata,
    WCAGTechnique,
    WCAGTechniquesReport,
    WCAGTechniqueMapping,
    Test,
    Technique,
    WCAGTechniques,
  };
}
