declare module "@qualweb/best-practices" {
  import { Position } from "css";
  import { QWPage } from "@qualweb/qw-page";

  interface BPOptions {
    bestPractices?: string[];
    exclude?: string[];
  }

  interface BestPracticeMetadata {
    target: {
      "parent-sibling"?: string;
      parent?: string | string[];
      element?: string | string[];
      children?: string | string[];
      attributes?: string | string[];
      css?: string | string[];
    };
    "success-criteria"?: {
      name: string;
      level: string;
      principle: string;
      url: string;
    }[];
    related?: string[];
    url?: string;
    passed: number;
    warning: number;
    failed: number;
    inapplicable: number;
    type?: string[];
    a11yReq?: string[];
    outcome: "passed" | "failed" | "warning" | "inapplicable" | "";
    description: string;
  }

  interface BestPracticeResult {
    verdict: "passed" | "failed" | "warning" | "inapplicable" | "";
    description: string[] | string | "";
    resultCode: string[] | string;
    elements?: BPElement[];
    attributes?: string | string[];
  }

  interface BPElement {
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
    position?: Position;
  }

  interface BestPracticesGlobalMetadata {
    passed: number;
    warning: number;
    failed: number;
    inapplicable: number;
  }

  interface BestPractice {
    name: string;
    code: string;
    mapping?: string;
    description: string;
    metadata: BestPracticeMetadata;
    results: BestPracticeResult[];
  }

  interface BestPracticesReport {
    type: "best-practices";
    metadata: BestPracticesGlobalMetadata;
    assertions: {
      [bestPractice: string]: BestPractice;
    };
  }

  class BestPractices {
    private bestPractices: any;
    private bestPracticesToExecute: any;

    constructor(options?: BPOptions);
    public configure(options: BPOptions): void;
    public resetConfiguration(): void;
    private executeBP(
      bestPractice: string,
      selector: string,
      page: QWPage | undefined,
      report: BestPracticesReport
    ): void;
    public execute(page: QWPage): BestPracticesReport;
  }

  export {
    BPOptions,
    BestPracticeMetadata,
    BestPracticeResult,
    BestPracticesGlobalMetadata,
    BestPractice,
    BestPracticesReport,
    BestPractices,
  };
}
