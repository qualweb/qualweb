/**
 * Driver-neutral types for the crawler. These are structurally compatible
 * with both Puppeteer's native objects (Browser/BrowserContext/Page and
 * Viewport) and the driver abstractions in @qualweb/core, so the crawler
 * itself carries no dependency on any specific browser automation library.
 */

/**
 * Life cycle events that signal the crawler that a page has finished
 * loading. Same literal values as Puppeteer's PuppeteerLifeCycleEvent.
 */
export type LoadEvent = 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2';

export type CrawlerViewport = {
  width: number;
  height: number;
  deviceScaleFactor?: number;
  isMobile?: boolean;
  isLandscape?: boolean;
  hasTouch?: boolean;
};

/**
 * The minimal page surface the crawler needs: open a url, run script in it,
 * close it.
 */
export interface CrawlerPage {
  setViewport(viewport: CrawlerViewport): Promise<void>;

  goto(url: string, options?: { waitUntil?: LoadEvent | LoadEvent[] }): Promise<unknown>;

  /*
   * `any` is deliberate: a stricter generic signature stops Puppeteer's
   * handle-aware Page.evaluate() from satisfying this interface structurally,
   * which would force every caller to cast.
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  evaluate(pageFunction: ((...args: any[]) => any) | string, ...args: any[]): Promise<any>;
  /* eslint-enable @typescript-eslint/no-explicit-any */

  close(): Promise<void>;
}

/**
 * Anything that can spawn pages for the crawler to use - a Puppeteer
 * Browser or BrowserContext, or a driver context from @qualweb/core.
 */
export interface PageSource {
  newPage(): Promise<CrawlerPage>;
}
