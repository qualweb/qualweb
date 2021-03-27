declare module "@qualweb/evaluation" {
  import {
    QualwebOptions,
    EvaluationReport,
    Evaluator,
    Execute,
  } from "@qualweb/core";
  import { ACTRulesReport, ACTRules } from "@qualweb/act-rules";
  import { WCAGTechniquesReport, WCAGOptions } from "@qualweb/wcag-techniques";
  import { BestPracticesReport } from "@qualweb/best-practices";
  import { CounterReport, executeCounter } from "@qualweb/counter";
  import { HTMLValidationReport } from "@qualweb/html-validator";
  import { QWPage } from "@qualweb/qw-page";
  import { QWElement } from "@qualweb/qw-element";
  import { DomUtils, AccessibilityUtils, CSSUtils } from "@qualweb/util";
  import { Page } from "puppeteer";

  declare global {
    interface Window {
      qwPage: QWPage;
      qwElement: QWElement;
      act: ACTRules;
      executeCounter: typeof executeCounter;
      DomUtils: typeof DomUtils;
      CSSUtils: typeof CSSUtils;
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

    public addQWPage(page: Page): Promise<void>;

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
  }
  class EvaluationRecord {
    constructor(evaluator: Evaluator);
    public addModuleEvaluation(module: any, evaluation: any): void;
    public getFinalReport(): EvaluationReport;
  }

  export { Evaluation, EvaluationRecord };
}
