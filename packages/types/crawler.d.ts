declare module '@qualweb/crawler' {
  import { Browser} from 'puppeteer';

  interface CrawlOptions {
    maxDepth?: number;
    maxUrls?: number;
    timeout?: number;
    maxParallelCrawls?: number;
    logging?: boolean;
  }

  class Crawler {
    private readonly browser: Browser;
    private readonly domain: string;
    private urls: Array<string>;

    constructor(browser: Browser, domain: string);

    public crawl(options?: CrawlOptions): Promise<void>;
    public getResults(): Array<string>;
    
    private verifyDomain(domain: string): string;
    private addUrlsToCrawl(urlsCrawled: any, urls: Array<string>): void;
    private fetchPageLinks(url: string): Promise<Array<string>>;
    private normalizeAndSort(urls: Array<string>): Array<string>;
  }

  export { CrawlOptions, Crawler };
}