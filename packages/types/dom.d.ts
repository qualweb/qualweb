import { QualwebOptions } from "@qualweb/core";
import { Browser } from "puppeteer";

declare module '@qualweb/dom' {

  class Dom {
    public getDOM(browser: Browser, options: QualwebOptions, url: string, html: string)
    public close();
  }

  export {
    Dom
  };
}