import type { Browser, BrowserContext, BrowserContextOptions, Page } from 'playwright';
import type {
  DriverPage,
  DriverResponse,
  DriverViewport,
  EvaluateFunction,
  NavigationOptions,
} from '@qualweb/core';
import { mapLoadEvent } from './lifecycle';

const DEFAULT_VIEWPORT: Required<Omit<DriverViewport, 'deviceScaleFactor'>> & { deviceScaleFactor: number } = {
  width: 1280,
  height: 720,
  deviceScaleFactor: 1,
  isMobile: false,
  isLandscape: true,
  hasTouch: false,
};

/**
 * {@link DriverPage} implementation backed by a Playwright {@link Page}.
 *
 * Several per-page concepts in Puppeteer (CSP bypass, user agent, the
 * isMobile/hasTouch viewport flags) are context-creation options in
 * Playwright. This class owns a dedicated {@link BrowserContext} per page
 * and transparently recreates it when one of those settings changes.
 * Recreation discards any loaded document, so those settings must be
 * changed *before* navigation - which is the only order QualWeb itself
 * uses (setBypassCSP and setViewport/setUserAgent both happen before
 * goto/setContent in QualwebPage.getTestingData).
 */
export class PlaywrightDriverPage implements DriverPage {
  private context: BrowserContext;
  private page: Page;
  private viewportState: DriverViewport;
  private userAgent?: string;
  private bypassCSP = true;
  private dismissingDialogs = false;

  private constructor(
    private readonly browser: Browser,
    context: BrowserContext,
    page: Page,
    private readonly browserUserAgent: string
  ) {
    this.context = context;
    this.page = page;
    this.viewportState = { ...DEFAULT_VIEWPORT };
  }

  public static async create(browser: Browser, browserUserAgent: string): Promise<PlaywrightDriverPage> {
    const context = await browser.newContext({
      bypassCSP: true,
      viewport: { width: DEFAULT_VIEWPORT.width, height: DEFAULT_VIEWPORT.height }
    });
    const page = await context.newPage();
    return new PlaywrightDriverPage(browser, context, page, browserUserAgent);
  }

  /**
   * Closes the context owned by this page. Called by the pool after each job.
   */
  public async dispose(): Promise<void> {
    await this.context.close();
  }

  public get nativePage(): unknown {
    return this.page;
  }

  public url(): string {
    return this.page.url();
  }

  public title(): Promise<string> {
    return this.page.title();
  }

  public countElements(selector: string): Promise<number> {
    return this.page.locator(selector).count();
  }

  public evaluate<Params extends unknown[], Func extends EvaluateFunction<Params> = EvaluateFunction<Params>>(
    pageFunction: Func | string,
    ...args: Params
  ): Promise<Awaited<ReturnType<Func>>> {
    if (typeof pageFunction === 'string') {
      return this.page.evaluate(pageFunction) as Promise<Awaited<ReturnType<Func>>>;
    }

    if (args.length === 0) {
      return this.page.evaluate(pageFunction as () => unknown) as Promise<Awaited<ReturnType<Func>>>;
    }

    // Playwright's evaluate() takes a single argument where Puppeteer's is
    // variadic. Serialize the function and spread the arguments in-page.
    // Indirect eval runs in the page's main world; the context is created
    // with bypassCSP so page CSP cannot block it - mirroring Puppeteer,
    // where evaluation also requires QualWeb's setBypassCSP(true).
    return this.page.evaluate(
      ({ source, args }) => {
        // eslint-disable-next-line no-eval
        const fn = (0, eval)(`(${source})`) as (...params: unknown[]) => unknown;
        return fn(...args);
      },
      { source: pageFunction.toString(), args: args as unknown[] }
    ) as Promise<Awaited<ReturnType<Func>>>;
  }

  public async setBypassCSP(enabled: boolean): Promise<void> {
    if (enabled !== this.bypassCSP) {
      this.bypassCSP = enabled;
      await this.recreateContext();
    }
  }

  public async goBack(): Promise<void> {
    await this.page.goBack();
  }

  public async setContent(html: string, options?: NavigationOptions): Promise<void> {
    await this.page.setContent(html, {
      timeout: options?.timeout,
      waitUntil: mapLoadEvent(options?.waitUntil)
    });
  }

  public content(): Promise<string> {
    return this.page.content();
  }

  public async addScriptTag(options: { path: string; type?: string }): Promise<void> {
    await this.page.addScriptTag(options);
  }

  public dismissDialogs(): void {
    this.dismissingDialogs = true;
    this.registerDialogHandler();
  }

  public async goto(url: string, options?: NavigationOptions): Promise<DriverResponse | null> {
    return this.page.goto(url, {
      timeout: options?.timeout,
      waitUntil: mapLoadEvent(options?.waitUntil)
    });
  }

  public viewport(): DriverViewport | null {
    return { ...this.viewportState };
  }

  public async setViewport(viewport: DriverViewport): Promise<void> {
    const flagsChanged =
      !!viewport.isMobile !== !!this.viewportState.isMobile ||
      !!viewport.hasTouch !== !!this.viewportState.hasTouch ||
      (viewport.deviceScaleFactor ?? 1) !== (this.viewportState.deviceScaleFactor ?? 1);

    this.viewportState = {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: viewport.deviceScaleFactor ?? 1,
      isMobile: !!viewport.isMobile,
      isLandscape: viewport.isLandscape ?? viewport.width > viewport.height,
      hasTouch: !!viewport.hasTouch
    };

    if (flagsChanged) {
      // isMobile/hasTouch/deviceScaleFactor are context-creation options in
      // Playwright and cannot be changed on a live page.
      await this.recreateContext();
    } else {
      await this.page.setViewportSize({ width: viewport.width, height: viewport.height });
    }
  }

  public async setUserAgent(userAgent: string): Promise<void> {
    if (userAgent !== (this.userAgent ?? this.browserUserAgent)) {
      this.userAgent = userAgent;
      // The user agent is a context-creation option in Playwright.
      await this.recreateContext();
    }
  }

  public getBrowserUserAgent(): Promise<string> {
    return Promise.resolve(this.browserUserAgent);
  }

  public async closeExtraTabs(): Promise<boolean> {
    const tabs = this.context.pages();

    let extraTabOpened = false;

    for (const tab of tabs) {
      if (tab === this.page) {
        continue;
      }

      const opener = await tab.opener();

      if (opener && opener.url() === this.page.url()) {
        extraTabOpened = true;
        await tab.close();
      }
    }

    return extraTabOpened;
  }

  private registerDialogHandler(): void {
    // Playwright auto-dismisses dialogs only while no listener is attached,
    // so the handler must dismiss explicitly.
    this.page.on('dialog', (dialog) => void dialog.dismiss().catch(() => undefined));
  }

  private async recreateContext(): Promise<void> {
    const oldContext = this.context;

    const options: BrowserContextOptions = {
      bypassCSP: this.bypassCSP,
      viewport: { width: this.viewportState.width, height: this.viewportState.height }
    };
    if (this.userAgent) {
      options.userAgent = this.userAgent;
    }
    // Only set when enabled: Firefox rejects the isMobile option outright.
    if (this.viewportState.isMobile) {
      options.isMobile = true;
    }
    if (this.viewportState.hasTouch) {
      options.hasTouch = true;
    }
    if (this.viewportState.deviceScaleFactor && this.viewportState.deviceScaleFactor !== 1) {
      options.deviceScaleFactor = this.viewportState.deviceScaleFactor;
    }

    this.context = await this.browser.newContext(options);
    this.page = await this.context.newPage();

    if (this.dismissingDialogs) {
      this.registerDialogHandler();
    }

    await oldContext.close();
  }
}
