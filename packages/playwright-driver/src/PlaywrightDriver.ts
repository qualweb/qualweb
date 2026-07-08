import { chromium, firefox, webkit } from 'playwright';
import type { Browser, LaunchOptions } from 'playwright';
import type {
  ClusterOptions,
  Driver,
  DriverContext,
  DriverContextPage,
  DriverPool,
} from '@qualweb/core/lib';
import { PlaywrightDriverPool } from './PlaywrightDriverPool';
import { mapLoadEvent } from './lifecycle';

export type PlaywrightBrowserName = 'chromium' | 'firefox' | 'webkit';

export type PlaywrightDriverOptions = {
  /**
   * Which Playwright browser to launch. Defaults to chromium.
   */
  browser?: PlaywrightBrowserName;

  /**
   * Playwright launch options. Unlike the default Puppeteer driver - which
   * receives Puppeteer launch options through `QualWeb.start()` for
   * backwards compatibility - the Playwright driver takes its launch options
   * here, at construction time. Any second argument passed to
   * `QualWeb.start()` is ignored by this driver.
   */
  launchOptions?: LaunchOptions;

  /**
   * Alternative browser launcher. Anything with a Playwright-compatible
   * `launch()` - most usefully one of playwright-extra's wrapped browsers,
   * which is how stealth/adblock plugin parity with the Puppeteer driver
   * is achieved:
   *
   * ```ts
   * import { chromium } from 'playwright-extra';
   * import StealthPlugin from 'puppeteer-extra-plugin-stealth';
   * chromium.use(StealthPlugin());
   * const driver = new PlaywrightDriver({ launcher: chromium });
   * ```
   */
  launcher?: { launch(options?: LaunchOptions): Promise<Browser> };
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
  constructor(private readonly options?: PlaywrightDriverOptions) {}

  public async launchPool(clusterOptions?: ClusterOptions): Promise<DriverPool> {
    const browser = await this.launchBrowser();
    return new PlaywrightDriverPool(browser, clusterOptions);
  }

  public async launchContext(): Promise<DriverContext> {
    const browser = await this.launchBrowser();
    const context = await browser.newContext();

    return {
      newPage: async (): Promise<DriverContextPage> => {
        const page = await context.newPage();

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
        await context.close();
        await browser.close();
      }
    };
  }

  private launchBrowser(): Promise<Browser> {
    if (this.options?.launcher) {
      return this.options.launcher.launch(this.options?.launchOptions);
    }

    const browserType = { chromium, firefox, webkit }[this.options?.browser ?? 'chromium'];
    return browserType.launch(this.options?.launchOptions);
  }
}
