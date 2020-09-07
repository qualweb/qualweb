declare module '@qualweb/dom' {
  import { QualwebOptions, SourceHtml } from '@qualweb/core';
  import { HTMLValidationReport } from '@qualweb/html-validator';
  import { Browser, Page } from 'puppeteer';

  interface PageData {
    sourceHtml: SourceHtml;
    page: Page;
    validation: HTMLValidationReport;
  }

  class Dom {
    public getDOM(browser: Browser, options: QualwebOptions, url: string, html: string): Promise<PageData>;
    public close(): Promise<void>;
  }

  export {
    Dom,
    PageData
  };
}