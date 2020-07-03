declare module '@qualweb/evaluation' {
  import { QualwebOptions, SourceHtml, CSSStylesheet, EvaluationReport, Evaluator } from '@qualweb/core';
  import { ACTRulesReport } from '@qualweb/act-rules';
  import { HTMLTechniquesReport } from '@qualweb/html-techniques';
  import { CSSTechniquesReport } from '@qualweb/css-techniques';
  import { BestPracticesReport } from '@qualweb/best-practices';
  import { Page } from 'puppeteer';

  class Evaluation {
    public evaluatePage(sourceHtml: SourceHtml, page: Page, stylesheets: CSSStylesheet[], mappedDOM: any, execute: any, options: QualwebOptions, url: string): Promise<EvaluationRecord>;
    public addQWPage(page: Page): Promise<void>;
    public executeBP(page: Page, options: QualwebOptions): Promise<BestPracticesReport>;
    public executeCSS(stylesheets: CSSStylesheet[], mappedDOM: any, options: QualwebOptions): Promise<CSSTechniquesReport>;
    public executeHTML(page: Page, options: QualwebOptions): Promise<HTMLTechniquesReport>;
    public executeACT(page: Page, sourceHtml: SourceHtml, stylesheets: CSSStylesheet[], options: QualwebOptions): Promise<ACTRulesReport>;
    public getEvaluator(page: Page, sourceHtml: SourceHtml, stylesheets: CSSStylesheet[], url: string): Promise<Evaluator>;
  }
  class EvaluationRecord {
  
    constructor(evaluator: any);
    public addModuleEvaluation(module: any, evaluation: any): void;
    public getFinalReport(): EvaluationReport;
  }

  export {
    Evaluation,
    EvaluationRecord
  };
}