declare module "@qualweb/act-rules" {
  import { QWPage } from "@qualweb/qw-page";
  import { SourceHtml } from "@qualweb/core";
  import { Optimization } from "@qualweb/util";

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
    private optimization: Optimization;
    private rules: any;
    private rulesToExecute: any;

    constructor(options?: ACTROptions);
    public configure(options: ACTROptions): void;
    public resetConfiguration(): void;
    private executeSourceHtmlMappedRules(
      report: ACTRulesReport,
      html: SourceHtml,
      selectors: string[],
      mappedRules: any
    ): void;
    private executeRule(
      rule: string,
      selector: string,
      page: QWPage,
      report: ACTRulesReport,
      concurrent: boolean
    ): void;
    private executePageMappedRules(
      report: ACTRulesReport,
      page: QWPage,
      selectors: string[],
      mappedRules: any,
      concurrent: boolean
    ): void;
    private executeNotMappedRules(report: ACTRulesReport): void;
    private executeNonConcurrentRules(
      report: ACTRulesReport,
      html: SourceHtml,
      page: QWPage
    ): void;
    private executeConcurrentRules(
      report: ACTRulesReport,
      html: SourceHtml,
      page: QWPage
    ): void;
    public execute(sourceHtml: SourceHtml, page: QWPage): ACTRulesReport;
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
