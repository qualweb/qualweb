declare module "@qualweb/best-practices" {
  import { Translate, TranslationValues } from "@qualweb/locale";
  import { QWElement } from "@qualweb/qw-element";

  interface BPOptions {
    bestPractices?: Array<string>;
    exclude?: Array<string>;
  }

  interface SuccessCriteria {
    name: string;
    level: string;
    principle: string;
    url: string;
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
    "success-criteria"?: Array<SuccessCriteria>;
    related?: string[];
    url?: string;
    passed: number;
    warning: number;
    failed: number;
    inapplicable: number;
    type?: string[];
    a11yReq?: string[];
    outcome: "passed" | "failed" | "warning" | "inapplicable";
    description: string;
  }

  interface BestPracticeResult {
    verdict: "passed" | "failed" | "warning" | "inapplicable";
    description: string;
    resultCode: string;
    elements: Array<BPElement>;
    attributes: Array<string>;
  }

  interface BPElement {
    pointer?: string;
    htmlCode?: string;
    accessibleName?: string;
    attributes?: Array<string>;
    cssCode?: string;
    property?: {
      name?: string;
      value?: string;
    };
    stylesheetFile?: string;
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
    results: Array<BestPracticeResult>;
  }

  interface BestPracticesReport {
    type: "best-practices";
    metadata: BestPracticesGlobalMetadata;
    assertions: {
      [bestPractice: string]: BestPractice;
    };
  }

  interface BPMapping {
    [selector: string]: Array<string>;
  }

  class Test implements BestPracticeResult {
    verdict: "passed" | "failed" | "warning" | "inapplicable";
    description: string;
    resultCode: string;
    elements: BPElement[];
    attributes: Array<string>;

    constructor(
      verdict?: "passed" | "failed" | "warning",
      description?: string,
      resultCode?: string
    );

    public addElement(
      element: QWElement,
      withText: boolean,
      fullElement: boolean
    ): void;
  }

  abstract class BestPracticeObject {
    private readonly bestPractice: BestPractice;
    private readonly locale: Translate;

    constructor(bestPractice: BestPractice, locale: Translate);

    protected getNumberOfWarningResults(): number;

    protected addTestResult(test: Test): void;

    public abstract execute(element: QWElement | undefined): void;

    public getFinalResults(): BestPractice;

    protected getTranslation(
      resultCode: string,
      values?: TranslationValues
    ): string;

    private outcomeBestPractice(): void;

    private addDescription(): void;
  }

  class BestPractices {
    private readonly bestPractices: { [bp: string]: BestPracticeObject };
    private readonly bestPracticesToExecute: { [bp: string]: boolean };

    constructor(locale: Translate, options?: BPOptions);

    public configure(options: BPOptions): void;
    public resetConfiguration(): void;
    public execute(): BestPracticesReport;

    private executeBP(
      bestPractice: string,
      selector: string,
      report: BestPracticesReport
    ): void;
  }

  export {
    BPOptions,
    BestPracticeMetadata,
    BestPracticeResult,
    BPElement,
    BestPracticesGlobalMetadata,
    BestPractice,
    BestPracticesReport,
    BPMapping,
    Test,
    BestPracticeObject,
    BestPractices,
  };
}
