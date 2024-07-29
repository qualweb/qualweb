declare module "@qualweb/cui-checks" {
  import { Translate, TranslationValues } from "@qualweb/locale";
  import { QWElement } from "@qualweb/qw-element";
  import { Level, Principle } from "@qualweb/evaluation";

  interface CUIOptions {
    rules?: string[];
    exclude?: string[];
    levels?: Array<Level>;
    principles?: Array<Principle>;
  }

  interface SuccessCriteria {
    name: string;
    level: Level;
    principle: Principle;
    url: string;
    url_tr: string;
  }

  interface CUICheckMetadata {
    target: any;
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

  interface CUICheckResult {
    verdict: "passed" | "failed" | "warning" | "inapplicable";
    description: string;
    resultCode: string;
    elements: Array<CUIElement>;
    attributes: Array<string>;
  }
  interface CUIElement {
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
    additional?: {
      [key: string]: string | number | boolean;
    };
  }

  interface CUICheck {
    name: string;
    code: string;
    mapping: string;
    description: string;
    metadata: CUICheckMetadata;
    results: CUICheckResult[];
  }

  interface CUIMetadata {
    passed: number;
    warning: number;
    failed: number;
    inapplicable: number;
  }

  interface CUIChecksReport {
    type: "cui-checks";
    metadata: CUIMetadata;
    assertions: {
      [rule: string]: CUICheck;
    };
  }

  interface CUIChecksMapping {
    [selector: string]: Array<string>;
  }

  class Test implements CUICheckResult {
    verdict: "passed" | "failed" | "warning" | "inapplicable";
    description: string;
    resultCode: string;
    elements: CUIElement[];
    attributes: Array<string>;

    constructor(
      verdict?: "passed" | "failed" | "warning",
      description?: string,
      resultCode?: string
    );

    public addElement(
      element: QWElement,
      withText: boolean,
      fullElement: boolean,
      aName?: boolean
    ): void;

    public addElements(
      elements: Array<QWElement>,
      withText: boolean,
      fullElement: boolean,
      aName?: boolean
    ): void;
  }

  abstract class Rule {
    private readonly rule: CUICheck;
    private readonly locale: Translate;

    constructor(rule: CUICheck, locale: Translate);

    public getRuleMapping(): string;

    public hasPrincipleAndLevels(
      principles: Array<Principle>,
      levels: Array<Level>
    ): boolean;

    public getFinalResults(): CUICheck;

    protected getNumberOfPassedResults(): number;

    protected getNumberOfWarningResults(): number;

    protected getNumberOfFailedResults(): number;

    protected addTestResult(test: Test): void;

    protected getTranslation(
      resultCode: string,
      values?: TranslationValues
    ): string;

    private outcomeRule(): void;

    private addDescription(): void;
  }

  class CUIChecks {
    private readonly rules: { [rule: string]: CUICheck };
    private readonly rulesToExecute: { [rule: string]: boolean };

    private readonly report: CUIChecksReport;

    constructor(locale: Translate, options?: CUIOptions);

    public configure(options: CUIOptions): void;
    public resetConfiguration(): void;
    public validateMetaElements(metaElements: Array<QWElement>): void;
    public validateZoomedTextNodeNotClippedWithCSSOverflow(): void;
    public validateFirstFocusableElementIsLinkToNonRepeatedContent(): void;
    public getReport(): CUIChecksReport;

    private executeRule(rule: string, selector: string): void;
  }

  export {
    CUIOptions,
    SuccessCriteria,
    CUICheckMetadata,
    CUICheckResult,
    CUIElement,
    CUICheck,
    CUIMetadata,
    CUIChecksReport,
    CUIChecksMapping,
    TranslationValues,
    Test,
    Rule,
    CUIChecks,
  };
}
