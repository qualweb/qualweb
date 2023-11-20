declare module "@qualweb/dom" {
  import { QualwebOptions, PageOptions } from "@qualweb/core";
  import { HTMLValidationReport } from "@qualweb/html-validator";
  import { Page, Viewport } from "puppeteer";

  interface DomData {
    html: string;
    title?: string;
    elementCount?: number;
  }

  interface PageData {
    sourceHtml: string;
    validation?: HTMLValidationReport;
  }

  class Dom {
    private readonly page: Page;
    private readonly endpoint: string;

    constructor(page: Page, validator?: string);

    public process(
      options: QualwebOptions,
      url: string,
      html: string
    ): Promise<PageData>;

    private removeUrlAnchor(url: string): string;
    private navigateToPage(
      url: string,
      options: QualwebOptions
    ): Promise<Response | null>;

    private setPageViewport(options?: PageOptions): Promise<void>;
    private createViewportObject(options: PageOptions): Viewport;
    private getSourceHtml(url: string, options?: PageOptions): Promise<string>;
    private getValidatorResult(
      url: string
    ): Promise<HTMLValidationReport | undefined>;
    private validatorNeeded(options: QualwebOptions): boolean;
    private isModuleSetToExecute(
      options: QualwebOptions,
      module: string
    ): boolean;
    private moduleIncludesValidatorTechnique(options: QualwebOptions): boolean;
    private moduleExcludesValidatorTechnique(options: QualwebOptions): boolean;
    private sourceHTMLNeeded(options: QualwebOptions): boolean;
    private moduleIncludesSourceCodeRule(options: QualwebOptions): boolean;
    private moduleExcludesSourceCodeRule(options: QualwebOptions): boolean;
    private isHtmlDocument(content?: string, url?: string): boolean;
  }

  export { Dom, PageData, DomData };
}
