declare module "@qualweb/dom" {
  import { QualwebOptions, PageOptions } from "@qualweb/core";
  import { HTMLValidationReport } from "@qualweb/html-validator";
  import { Browser, Page, Viewport, LoadEvent } from "puppeteer";

  interface DomData {
    html: string;
    title?: string;
    elementCount?: number;
  }

  interface PageData {
    sourceHtmlHeadContent: string;
    page: Page;
    validation?: HTMLValidationReport;
  }

  class Dom {
    private page: Page | null;
    private endpoint: string;

    public getDOM(
      browser: Browser,
      options: QualwebOptions,
      url: string,
      html: string
    ): Promise<PageData>;
    public close(): Promise<void>;
    public navigateToPage(
      url: string,
      timeout?: number,
      waitUntil?: LoadEvent | LoadEvent[]
    ): Promise<Response | null>;

    private setPageViewport(options?: PageOptions): Promise<void>;
    private createViewportObject(options: PageOptions): Viewport;
    private getSourceHtml(url: string, options?: PageOptions): Promise<string>;
    private getHeadContent(html: string): string;
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
