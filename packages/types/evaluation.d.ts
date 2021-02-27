declare module "@qualweb/evaluation" {
  import {
    QualwebOptions,
    SourceHtml,
    EvaluationReport,
    Evaluator,
    Execute,
  } from "@qualweb/core";
  import { ACTRulesReport } from "@qualweb/act-rules";
  import { WCAGTechniquesReport, WCAGOptions } from "@qualweb/wcag-techniques";
  import { BestPracticesReport } from "@qualweb/best-practices";
  import { CounterReport } from "@qualweb/counter";
  import { HTMLValidationReport } from "@qualweb/html-validator";
  import { Page } from "puppeteer";

  class Evaluation {
    public evaluatePage(
      sourceHtml: SourceHtml,
      page: Page,
      execute: Execute,
      options: QualwebOptions,
      url: string,
      validation: HTMLValidationReport
    ): Promise<EvaluationRecord>;
    public addQWPage(page: Page): Promise<void>;
    public executeBP(
      page: Page,
      options: QualwebOptions
    ): Promise<BestPracticesReport>;
    public executeWCAG(
      page: Page,
      options: WCAGOptions | undefined,
      validation: HTMLValidationReport
    ): Promise<WCAGTechniquesReport>;
    public executeACT(
      page: Page,
      sourceHtml: SourceHtml,
      options: QualwebOptions
    ): Promise<ACTRulesReport>;
    public executeCounter(page: Page): Promise<CounterReport>;
    public getEvaluator(
      page: Page,
      sourceHtml: SourceHtml,
      url: string
    ): Promise<Evaluator>;
  }
  class EvaluationRecord {
    constructor(evaluator: Evaluator);
    public addModuleEvaluation(module: any, evaluation: any): void;
    public getFinalReport(): EvaluationReport;
  }

  export { Evaluation, EvaluationRecord };
}
