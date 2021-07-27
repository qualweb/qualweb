declare module "@qualweb/act-rules" {
  import { Translate, TranslationValues } from "@qualweb/locale";
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
    elements: Array<ACTElement>;
    attributes: Array<string>;
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
    additional?: {
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
    private readonly rule: ACTRule;
    private readonly locale: Translate;

    constructor(rule: ACTRule, locale: Translate);

    public getRuleMapping(): string;

    public hasPrincipleAndLevels(
      principles: Array<Principle>,
      levels: Array<Level>
    ): boolean;

    public getFinalResults(): ACTRule;

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

  abstract class CompositeRule extends Rule {
    constructor(rule: ACTRule, locale: Translate);

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
    constructor(rule: ACTRule, locale: Translate);

    abstract execute(element: QWElement | undefined): void;
  }

  class ACTRules {
    private readonly rules: { [rule: string]: AtomicRule | CompositeRule };
    private readonly rulesToExecute: { [rule: string]: boolean };

    private readonly report: ACTRulesReport;

    constructor(locale: Translate, options?: ACTROptions);

    public configure(options: ACTROptions): void;
    public resetConfiguration(): void;
    public executeAtomicRules(): void;
    public executeCompositeRules(): void;
    public validateMetaElements(metaElements: Array<QWElement>): void;
    public validateZoomedTextNodeNotClippedWithCSSOverflow(): void;
    public validateFirstFocusableElementIsLinkToNonRepeatedContent(): void;
    public getReport(): ACTRulesReport;

    private executeRule(rule: string, selector: string): void;
    private executeCompositeRule(
      rule: string,
      selector: string,
      atomicRules: Array<string>,
      implementation: "conjunction" | "disjunction"
    ): void;
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
    TranslationValues,
    Test,
    Rule,
    CompositeRule,
    AtomicRule,
    ACTRules,
  };
}
