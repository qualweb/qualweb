declare module "@qualweb/crawler" {
  import { Browser, BrowserContext, Viewport } from "puppeteer";
  import { LoadEvent } from "@qualweb/core";

  interface CrawlOptions {
    maxDepth?: number;
    maxUrls?: number;
    timeout?: number;
    maxParallelCrawls?: number;
    logging?: boolean;
  }

  class Crawler {
    private readonly browser: Browser | BrowserContext;
    private readonly viewport?: Viewport;
    private readonly startingUrl: string;
    private readonly isDomain: boolean;
    private readonly waitUntil: LoadEvent | Array<LoadEvent>;
    private urls: Array<string>;

    constructor(
      browser: Browser | BrowserContext,
      startingUrl: string,
      viewport?: Viewport,
      waitUntil?: LoadEvent | Array<LoadEvent>
    );

    public crawl(options?: CrawlOptions): Promise<void>;
    public getResults(): Array<string>;

    private verifyStartingUrl(startingUrl: string): string;
    private isStaringUrlADomain(startingUrl: string): boolean;
    private log(
      currentDepth: number,
      currentUrlCount: number,
      timer: number
    ): void;
    private addUrlsToCrawl(urlsCrawled: any, urls: Array<string>): void;
    private fetchPageLinks(url: string): Promise<Array<string>>;
    private checkRelativePathsUrls(urls: Array<string>): Promise<Array<string>>;
    private normalizeAndSort(urls: Array<string>): Array<string>;
  }

  export { CrawlOptions, Crawler };
}
