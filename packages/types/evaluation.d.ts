import { QualwebOptions, SourceHtml, CSSStylesheet, EvaluationReport } from "@qualweb/core";
import { Browser, Page } from "puppeteer";

declare module '@qualweb/evaluation' {

  class Evaluation {
    public evaluatePage( sourceHtml: SourceHtml, page: Page, stylesheets: CSSStylesheet[], mappedDOM: any, execute: any, options: QualwebOptions,url: string): Promise<EvaluationReport>
    public addQWPage(page: Page);
    public executeBP(page: Page, options: QualwebOptions)
    public executeCSS(stylesheets: CSSStylesheet[], mappedDOM: any, options: QualwebOptions)
    public executeHTML(page: Page, options: QualwebOptions)
    public executeACT(page: Page, sourceHtml: SourceHtml, stylesheets: CSSStylesheet[], options: QualwebOptions)
    public getEvaluator(page: Page, sourceHtml: SourceHtml, stylesheets: CSSStylesheet[], url: string)
  }

  export {
    Evaluation
  };
}