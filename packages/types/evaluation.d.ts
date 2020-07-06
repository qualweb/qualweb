declare module '@qualweb/evaluation' {
  import { QualwebOptions, SourceHtml, EvaluationReport, Evaluator } from '@qualweb/core';
  import { ACTRulesReport } from '@qualweb/act-rules';
  import { HTMLTechniquesReport } from '@qualweb/html-techniques';
  import { CSSTechniquesReport } from '@qualweb/css-techniques';
  import { BestPracticesReport } from '@qualweb/best-practices';
  import { Page } from 'puppeteer';

  class Evaluation {
    public evaluatePage(sourceHtml: SourceHtml, page: Page, execute: any, options: QualwebOptions, url: string): Promise<EvaluationRecord>;
    public addQWPage(page: Page): Promise<void>;
    public executeBP(page: Page, options: QualwebOptions): Promise<BestPracticesReport>;
    public executeCSS(page: Page, options: QualwebOptions): Promise<CSSTechniquesReport>;
    public executeHTML(page: Page, options: QualwebOptions): Promise<HTMLTechniquesReport>;
    public executeACT(page: Page, sourceHtml: SourceHtml, options: QualwebOptions): Promise<ACTRulesReport>;
    public getEvaluator(page: Page, sourceHtml: SourceHtml, url: string): Promise<Evaluator>;
  }
  class EvaluationRecord {
  
    constructor(evaluator: Evaluator);
    public addModuleEvaluation(module: any, evaluation: any): void;
    public getFinalReport(): EvaluationReport;
  }

  export {
    Evaluation,
    EvaluationRecord
  };
}