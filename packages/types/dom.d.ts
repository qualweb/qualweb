declare module '@qualweb/dom' {
  import { QualwebOptions } from "@qualweb/core";
  import { Browser } from "puppeteer";

  class Dom {
    public getDOM(browser: Browser, options: QualwebOptions, url: string, html: string)
    public close();
  }

  export {
    Dom
  };
}