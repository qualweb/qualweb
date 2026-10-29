import { chromium, firefox, webkit } from 'playwright';
import type { Browser, LaunchOptions, Page } from 'playwright';
import { PlaywrightBlocker } from '@ghostery/adblocker-playwright';
import type { ClusterOptions } from '../../ClusterOptions';
import type {
  Driver,
  DriverContext,
  DriverContextPage,
  DriverPool,
} from '../types';
import { PlaywrightDriverPool } from './PlaywrightDriverPool';
import { mapLoadEvent } from './lifecycle';

export type PlaywrightBrowserName = 'chromium' | 'firefox' | 'webkit';

export type PlaywrightDriverOptions = {
  /**
   * Which Playwright browser to launch. Defaults to chromium.
   */
  browser?: PlaywrightBrowserName;

  /**
   * Playwright launch options. Options passed to QualWeb.start() take precedence.
   */
  launchOptions?: LaunchOptions;

  /**
   * Alternative browser launcher with Playwright's launch contract.
   */
  launcher?: { launch(options?: LaunchOptions): Promise<Browser> };
  adBlock?: boolean;
  blocker?: PlaywrightBlocker;
};

/**
 * QualWeb {@link Driver} backed by Playwright.
 *
 * ```ts
 * const qualweb = new QualWeb(undefined, new PlaywrightDriver());
 * await qualweb.start({ maxConcurrency: 4 });
 * const reports = await qualweb.evaluate({ url, modules });
 * await qualweb.stop();
 * ```
 */
export class PlaywrightDriver implements Driver {
  private blocker?: Promise<PlaywrightBlocker>;

  constructor(private readonly options?: PlaywrightDriverOptions) {}

  public async launchPool(clusterOptions?: ClusterOptions, browserOptions?: unknown): Promise<DriverPool> {
    if (clusterOptions?.monitor) {
      throw new Error('Playwright does not support the Puppeteer cluster monitor option.');
    }
    const setupPage = await this.pageSetup();
    const browser = await this.launchBrowser(browserOptions);
    try {
      return new PlaywrightDriverPool(browser, clusterOptions, setupPage);
    } catch (error) {
      await browser.close();
      throw error;
    }
  }

  public async launchContext(): Promise<DriverContext> {
    const setupPage = await this.pageSetup();
    const browser = await this.launchBrowser();
    let context;
    try {
      context = await browser.newContext();
    } catch (error) {
      await browser.close();
      throw error;
    }

    return {
      newPage: async (): Promise<DriverContextPage> => {
        const page = await context.newPage();
        try {
          await setupPage?.(page);
        } catch (error) {
          await page.close();
          throw error;
        }

        return {
          setViewport: async (viewport): Promise<void> => {
            await page.setViewportSize({ width: viewport.width, height: viewport.height });
          },
          goto: (url, options): Promise<unknown> => {
            return page.goto(url, { waitUntil: mapLoadEvent(options?.waitUntil) });
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          evaluate: (pageFunction: ((...args: any[]) => any) | string, ...args: any[]): Promise<any> => {
            if (typeof pageFunction === 'string') {
              return page.evaluate(pageFunction);
            }
            if (args.length === 0) {
              return page.evaluate(pageFunction as () => unknown);
            }
            // See PlaywrightDriverPage.evaluate for why arguments are packed.
            return page.evaluate(
              ({ source, args }) => {
                // eslint-disable-next-line no-eval
                const fn = (0, eval)(`(${source})`) as (...params: unknown[]) => unknown;
                return fn(...args);
              },
              { source: pageFunction.toString(), args }
            );
          },
          close: async (): Promise<void> => {
            await page.close();
          }
        };
      },
      close: async (): Promise<void> => {
        try {
          await context.close();
        } finally {
          await browser.close();
        }
      }
    };
  }

  private async pageSetup(): Promise<((page: Page) => Promise<void>) | undefined> {
    if (!this.options?.adBlock && !this.options?.blocker) {
      return undefined;
    }
    this.blocker ??= this.options.blocker
      ? Promise.resolve(this.options.blocker)
      : PlaywrightBlocker.fromPrebuiltFull(fetch);
    const blocker = await this.blocker;
    return async (page): Promise<void> => {
      await blocker.enableBlockingInPage(page);
    };
  }

  private launchBrowser(browserOptions?: unknown): Promise<Browser> {
    if (browserOptions !== undefined && (typeof browserOptions !== 'object' || browserOptions === null || Array.isArray(browserOptions))) {
      throw new TypeError('Browser launch options must be an object.');
    }
    const options: LaunchOptions = { ...this.options?.launchOptions, ...browserOptions };
    if (this.options?.launcher) {
      return this.options.launcher.launch(options);
    }

    const browserType = { chromium, firefox, webkit }[this.options?.browser ?? 'chromium'];
    return browserType.launch(options);
  }
}
