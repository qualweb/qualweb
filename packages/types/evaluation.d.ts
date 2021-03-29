declare module "@qualweb/evaluation" {
  import { QualwebOptions, EvaluationReport, Evaluator, Execute, Module, Url } from "@qualweb/core";
  import { Report } from '@qualweb/earl-reporter';
  import { ACTRulesReport, ACTRules } from "@qualweb/act-rules";
  import { WCAGTechniquesReport, WCAGOptions } from "@qualweb/wcag-techniques";
  import { BestPracticesReport } from "@qualweb/best-practices";
  import { WappalyzerReport } from '@qualweb/wappalyzer';
  import { CounterReport, executeCounter } from "@qualweb/counter";
  import { HTMLValidationReport } from "@qualweb/html-validator";
  import { QWPage } from "@qualweb/qw-page";
  import { QWElement } from "@qualweb/qw-element";
  import { DomUtils, AccessibilityUtils } from "@qualweb/util";
  import { Browser, Page } from "puppeteer";

  global {
    interface Window {
      qwPage: QWPage;
      qwElement: QWElement;
      act: ACTRules;
      executeCounter: typeof executeCounter;
      DomUtils: typeof DomUtils;
      AccessibilityUtils: typeof AccessibilityUtils;
    }
  }

  class Evaluation {
    public evaluatePage(
      sourceHtmlHeadContent: string,
      page: Page,
      execute: Execute,
      options: QualwebOptions,
      url: string,
      validation: HTMLValidationReport | undefined
    ): Promise<EvaluationRecord>;

    public init(page: Page): Promise<void>;

    public executeBP(
      page: Page,
      options: QualwebOptions
    ): Promise<BestPracticesReport>;

    public executeWCAG(
      page: Page,
      options: WCAGOptions | undefined,
      validation: HTMLValidationReport | undefined
    ): Promise<WCAGTechniquesReport>;

    public executeACT(
      page: Page,
      sourceHtmlHeadContent: string,
      options: QualwebOptions
    ): Promise<ACTRulesReport>;

    public executeCounter(page: Page): Promise<CounterReport>;

    public getEvaluator(page: Page, url: string): Promise<Evaluator>;

    private parseUrl(url: string, pageUrl: string): Url;

    private detectIfUnwantedTabWasOpened(browser: Browser, url: string): Promise<boolean>;
  }
  class EvaluationRecord {
    constructor(evaluator: Evaluator);
    public addModuleEvaluation(module: Module, evaluation: Report | WappalyzerReport | CounterReport): void;
    public getFinalReport(): EvaluationReport;
  }

  export { Evaluation, EvaluationRecord };
}
