import type { ClusterOptions } from '../ClusterOptions';

/**
 * Life cycle events that signal QualWeb that a page has finished loading.
 * These match Puppeteer's `PuppeteerLifeCycleEvent` literal values. Drivers
 * for other browser automation libraries are responsible for mapping them
 * to their closest native equivalent (e.g. Playwright maps `networkidle0`
 * and `networkidle2` to `networkidle`).
 */
export type LoadEvent = 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2';

/**
 * Viewport description used by QualWeb. Structurally identical to
 * Puppeteer's `Viewport` type. Drivers whose underlying library carries
 * less information (e.g. Playwright only exposes width/height on a live
 * page) must synthesize the remaining fields from their own bookkeeping.
 */
export type DriverViewport = {
  width: number;
  height: number;
  deviceScaleFactor?: number;
  isMobile?: boolean;
  isLandscape?: boolean;
  hasTouch?: boolean;
};

export type Awaitable<T> = T | PromiseLike<T>;

export type EvaluateFunction<Params extends unknown[]> = (...params: Params) => Awaitable<unknown>;

/**
 * Options accepted by navigation-like operations ({@link DriverPage.goto}
 * and {@link DriverPage.setContent}).
 */
export type NavigationOptions = {
  timeout?: number;
  waitUntil?: LoadEvent | LoadEvent[];
};

/**
 * The subset of an HTTP response QualWeb consumes after navigation.
 */
export interface DriverResponse {
  text(): Promise<string>;
}

/**
 * A single browser page (tab), abstracted away from the underlying browser
 * automation library. This is the complete page surface QualWeb needs to
 * run an evaluation.
 */
export interface DriverPage {
  /**
   * The underlying automation library's own page object (e.g. a Puppeteer
   * `Page` or a Playwright `Page`). Escape hatch for plugins and tests that
   * need driver-specific functionality not covered by this interface.
   * Consumers must narrow the type themselves and accept that using it
   * couples them to a specific driver.
   */
  readonly nativePage: unknown;

  url(): string;

  title(): Promise<string>;

  /**
   * Number of elements in the page matching the given CSS selector.
   */
  countElements(selector: string): Promise<number>;

  evaluate<Params extends unknown[], Func extends EvaluateFunction<Params> = EvaluateFunction<Params>>(
    pageFunction: Func | string,
    ...args: Params
  ): Promise<Awaited<ReturnType<Func>>>;

  setBypassCSP(enabled: boolean): Promise<void>;

  goBack(): Promise<void>;

  setContent(html: string, options?: NavigationOptions): Promise<void>;

  content(): Promise<string>;

  /**
   * Injects a script file into the page.
   */
  addScriptTag(options: { path: string; type?: string }): Promise<void>;

  /**
   * Automatically dismisses any dialog (alert/confirm/prompt) the page opens.
   */
  dismissDialogs(): void;

  goto(url: string, options?: NavigationOptions): Promise<DriverResponse | null>;

  viewport(): DriverViewport | null;

  setViewport(viewport: DriverViewport): Promise<void>;

  setUserAgent(userAgent: string): Promise<void>;

  /**
   * The user agent reported by the browser itself (not any per-page override).
   */
  getBrowserUserAgent(): Promise<string>;

  /**
   * Detects tabs that were opened by this page (e.g. by scripts or
   * `target="_blank"` redirects), closes them, and reports whether any
   * were found.
   */
  closeExtraTabs(): Promise<boolean>;
}

/**
 * Data describing one evaluation job: either a url to navigate to or raw
 * html to load.
 */
export type EvaluationJobData = {
  url?: string;
  html?: string;
};

/**
 * A pool of browser pages used to run evaluations, potentially concurrently.
 * Mirrors the semantics QualWeb previously consumed from puppeteer-cluster:
 * a single task callback, a fire-and-forget queue, and an idle barrier.
 */
export interface DriverPool {
  /**
   * Registers the callback that processes each queued job. The pool provides
   * a fresh page per job and is responsible for cleaning it up afterwards.
   */
  task(handler: (page: DriverPage, data: EvaluationJobData) => Promise<void>): Promise<void>;

  queue(data: EvaluationJobData): void;

  /**
   * Resolves once all queued jobs have finished.
   */
  idle(): Promise<void>;

  close(): Promise<void>;

  /**
   * Registers a handler called whenever a job errors instead of rejecting.
   */
  onTaskError(handler: (error: Error, data: EvaluationJobData) => void): void;
}

/**
 * A page as consumed by @qualweb/crawler: the minimal surface needed to
 * open urls and extract links. Kept intentionally small so both raw
 * automation-library pages and driver wrappers can satisfy it.
 */
export interface DriverContextPage {
  setViewport(viewport: DriverViewport): Promise<void>;

  goto(url: string, options?: { waitUntil?: LoadEvent | LoadEvent[] }): Promise<unknown>;

  /*
   * `any` is deliberate and mirrors @qualweb/crawler's CrawlerPage: a
   * stricter generic signature stops Puppeteer's handle-aware
   * Page.evaluate() from satisfying this interface structurally.
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  evaluate(pageFunction: ((...args: any[]) => any) | string, ...args: any[]): Promise<any>;
  /* eslint-enable @typescript-eslint/no-explicit-any */

  close(): Promise<void>;
}

/**
 * An isolated browser context that can spawn pages. Used by QualWeb's
 * crawl functionality.
 */
export interface DriverContext {
  newPage(): Promise<DriverContextPage>;

  close(): Promise<void>;
}

/**
 * A browser automation driver. QualWeb ships with a Puppeteer implementation
 * ({@link PuppeteerDriver}) and uses it by default; alternative
 * implementations (e.g. Playwright) can be passed to the QualWeb constructor.
 */
export interface Driver {
  /**
   * Launches the browser (pool) used for evaluations.
   *
   * @param clusterOptions - Concurrency/timeout/monitor options.
   * @param browserOptions - Driver-specific browser launch options. The
   * default Puppeteer driver accepts Puppeteer launch options here (kept for
   * backwards compatibility with `QualWeb.start()`); other drivers should
   * receive their launch options at construction time and may ignore this.
   */
  launchPool(clusterOptions?: ClusterOptions, browserOptions?: unknown): Promise<DriverPool>;

  /**
   * Launches an isolated browser context for crawling.
   */
  launchContext(): Promise<DriverContext>;
}
