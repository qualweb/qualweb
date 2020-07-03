declare module '@qualweb/dom' {
  import { QualwebOptions, SourceHtml, CSSStylesheet } from '@qualweb/core';
  import { Browser, Page } from 'puppeteer';
  import { Stylesheet } from 'css';

  interface PageData {
    sourceHtml: SourceHtml,
    page: Page,
    stylesheets: CSSStylesheet[];
    mappedDOM: any;
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