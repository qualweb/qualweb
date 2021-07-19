declare module "@qualweb/act-rules" {
  import { QWElement } from "@qualweb/qw-element";
  import { Level, Principle } from "@qualweb/evaluation";

  interface ACTROptions {
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
  }

  interface ACTRuleMetadata {
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

  interface ACTRuleResult {
    verdict: "passed" | "failed" | "warning" | "inapplicable";
    description: string;
    resultCode: string;
    elements?: ACTElement[];
    attributes?: string | string[];
  }
  interface ACTElement {
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
    additional: {
      [key: string]: string | number | boolean;
    };
  }

  interface ACTRule {
    name: string;
    code: string;
    mapping: string;
    description: string;
    metadata: ACTRuleMetadata;
    results: ACTRuleResult[];
  }

  interface ACTMetadata {
    passed: number;
    warning: number;
    failed: number;
    inapplicable: number;
  }

  interface ACTRulesReport {
    type: "act-rules";
    metadata: ACTMetadata;
    assertions: {
      [rule: string]: ACTRule;
    };
  }

  interface ACTAtomicRuleMapping {
    [selector: string]: Array<string>;
  }

  interface ACTCompositeRuleMapping {
    [selector: string]: {
      selector: string;
      implementation: "conjunction" | "disjunction";
      rules: Array<string>;
    };
  }

  class Test implements ACTRuleResult {
    verdict: "passed" | "failed" | "warning" | "inapplicable";
    description: string;
    resultCode: string;
    elements: ACTElement[];
    attributes?: string | string[] | undefined;

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
    private readonly rule: ACTRule;

    constructor(rule: ACTRule);

    public getRuleMapping(): string;

    public hasPrincipleAndLevels(
      principles: Array<Principle>,
      levels: Array<Level>
    ): boolean;

    protected getNumberOfPassedResults(): number;

    protected getNumberOfWarningResults(): number;

    protected getNumberOfFailedResults(): number;

    protected addTestResult(test: Test): void;

    public getFinalResults(): ACTRule;

    private outcomeRule(): void;

    private addDescription(): void;
  }

  abstract class CompositeRule extends Rule {
    constructor(rule: ACTRule);

    abstract execute(
      element: QWElement | undefined,
      rules?: Array<ACTRule>
    ): void;

    public conjunction(element: QWElement, rules: Array<ACTRule>): void;

    public disjunction(element: QWElement, rules: Array<ACTRule>): void;

    public getAtomicRuleResultPerVerdict(
      selector: string,
      rules: Array<ACTRule>
    ): any;

    public getAtomicRuleResultForElement(
      selector: string,
      rules: Array<ACTRule>
    ): any;
  }

  abstract class AtomicRule extends Rule {
    constructor(rule: ACTRule);

    abstract execute(element: QWElement | undefined): void;
  }

  class ACTRules {
    private readonly rules: { [rule: string]: AtomicRule | CompositeRule };
    private readonly rulesToExecute: { [rule: string]: boolean };

    private readonly report: ACTRulesReport;

    constructor(options?: ACTROptions);
    public configure(options: ACTROptions): void;
    public resetConfiguration(): void;

    private executeRule(rule: string, selector: string): void;
    private executeCompositeRule(
      rule: string,
      selector: string,
      atomicRules: Array<string>,
      implementation: "conjunction" | "disjunction"
    ): void;
    public executeAtomicRules(): void;
    public executeCompositeRules(): void;
    public validateMetaElements(metaElements: Array<QWElement>): void;
    public validateZoomedTextNodeNotClippedWithCSSOverflow(): void;
    public validateFirstFocusableElementIsLinkToNonRepeatedContent(): void;
    public getReport(): ACTRulesReport;
  }

  export {
    ACTROptions,
    SuccessCriteria,
    ACTRuleMetadata,
    ACTRuleResult,
    ACTElement,
    ACTRule,
    ACTMetadata,
    ACTRulesReport,
    ACTAtomicRuleMapping,
    ACTCompositeRuleMapping,
    Test,
    Rule,
    CompositeRule,
    AtomicRule,
    ACTRules,
  };
}
