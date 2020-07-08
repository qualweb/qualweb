declare module '@qualweb/dom' {
  import { QualwebOptions, SourceHtml } from '@qualweb/core';
  import { Browser, Page } from 'puppeteer';

  interface PageData {
    sourceHtml: SourceHtml,
    page: Page;
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