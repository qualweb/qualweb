declare module "@qualweb/act-rules" {
  import { QWPage } from "@qualweb/qw-page";
  import { QWElement } from "@qualweb/qw-element";

  interface ACTROptions {
    rules?: string[];
    exclude?: string[];
    levels?: string[];
    principles?: string[];
  }

  interface SuccessCriteria {
    name: string;
    level: string;
    principle: string;
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
    type?: string[];
    a11yReq?: string[];
    outcome: "passed" | "failed" | "warning" | "inapplicable" | "";
    description: string;
  }

  interface ACTRuleResult {
    verdict: "passed" | "failed" | "warning" | "inapplicable" | "";
    description: string | "";
    resultCode: string | "";
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

  class ACTRules {
    private readonly rules: any;
    private readonly rulesToExecute: any;
    private readonly report: ACTRulesReport;

    constructor(options?: ACTROptions);
    public configure(options: ACTROptions): void;
    public resetConfiguration(): void;

    private executeRule(rule: string, selector: string, page: QWPage): void;
    private executeCompositeRule(
      rule: string,
      selector: string,
      atomicRules: Array<string>,
      implementation: string,
      page: QWPage
    ): void;
    public executeAtomicRules(page: QWPage): void;
    public executeCompositeRules(page: QWPage): void;
    public validateMetaElements(metaElements: Array<QWElement>): void;
    public validateZoomedTextNodeNotClippedWithCSSOverflow(page: QWPage): void;
    public validateFirstFocusableElementIsLinkToNonRepeatedContent(
      page: QWPage
    ): void;
    public getReport(): ACTRulesReport;
  }

  export {
    ACTROptions,
    SuccessCriteria,
    ACTRuleMetadata,
    ACTRuleResult,
    ACTRule,
    ACTMetadata,
    ACTRulesReport,
    ACTRules,
  };
}
