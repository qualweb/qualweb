declare module "@qualweb/evaluation" {
  import {
    QualwebOptions,
    EvaluationReport,
    Evaluator,
    Execute,
    Modules,
    Module,
    Url,
  } from "@qualweb/core";
  import { Report } from "@qualweb/earl-reporter";
  import { ACTRulesReport, ACTRules, ACTROptions } from "@qualweb/act-rules";
  import {
    WCAGTechniquesReport,
    WCAGOptions,
    WCAGTechniques,
  } from "@qualweb/wcag-techniques";
  import { BestPracticesReport, BPOptions } from "@qualweb/best-practices";
  import { WappalyzerReport } from "@qualweb/wappalyzer";
  import { CounterReport, executeCounter } from "@qualweb/counter";
  import { HTMLValidationReport } from "@qualweb/html-validator";
  import { QWPage } from "@qualweb/qw-page";
  import { QWElement } from "@qualweb/qw-element";
  import { DomUtils, AccessibilityUtils } from "@qualweb/util";
  import { Page } from "puppeteer";

  type Level = "A" | "AA" | "AAA";
  type Principle = "Perceivable" | "Operable" | "Understandable" | "Robust";

  global {
    interface Window {
      qwPage: QWPage;
      qwElement: QWElement;
      act: ACTRules;
      wcag: WCAGTechniques;
      executeCounter: typeof executeCounter;
      DomUtils: typeof DomUtils;
      AccessibilityUtils: typeof AccessibilityUtils;
      disabledWidgets: Array<QWElement>;
    }
  }

  class Metadata {
    private passed: number;
    private warning: number;
    private failed: number;
    private inapplicable: number;

    public addPassedResults(results: number): void;
    public addWarningResults(results: number): void;
    public addFailedResults(results: number): void;
    public addInapplicableResults(results: number): void;
    public getResults(): {
      passed: number;
      failed: number;
      warning: number;
      inapplicable: number;
    };
  }

  class EvaluationRecord {
    private readonly type: "evaluation";
    private readonly evaluator: Evaluator;
    private readonly metadata: Metadata;
    private readonly modules: Modules;

    constructor(evaluator: Evaluator);
    public addModuleEvaluation(
      module: Module,
      evaluation: Report | WappalyzerReport | CounterReport
    ): void;
    public getFinalReport(): EvaluationReport;
  }

  class Evaluation {
    private readonly url: string;
    private readonly page: Page;
    private readonly execute: Execute;

    constructor(url: string, page: Page, execute: Execute);
    public evaluatePage(
      sourceHtmlHeadContent: string,
      options: QualwebOptions,
      validation?: HTMLValidationReport
    ): Promise<EvaluationRecord>;
    private getEvaluator(): Promise<Evaluator>;
    private parseUrl(): Url;
    private init(): Promise<void>;
    private executeACT(
      sourceHtmlHeadContent: string,
      options?: ACTROptions
    ): Promise<ACTRulesReport>;
    private executeWCAG(
      validation?: HTMLValidationReport,
      options?: WCAGOptions
    ): Promise<WCAGTechniquesReport>;
    private executeBP(options?: BPOptions): Promise<BestPracticesReport>;
    private executeCounter(): Promise<CounterReport>;
    private detectIfUnwantedTabWasOpened(): Promise<boolean>;
  }

  export { Level, Principle, Evaluation, EvaluationRecord, Metadata };
}
