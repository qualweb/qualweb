import type { LaunchOptions, BrowserLaunchArgumentOptions, BrowserConnectOptions } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import { Cluster } from 'puppeteer-cluster';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdBlocker from 'puppeteer-extra-plugin-adblocker';
import type { ClusterOptions } from '../../ClusterOptions';
import type { PuppeteerPlugins } from '../../PuppeteerPlugins';
import type {
  Driver,
  DriverContext,
  DriverContextPage,
  DriverPool,
  EvaluationJobData,
} from '../types';
import { PuppeteerDriverPage } from './PuppeteerDriverPage';

export type PuppeteerLaunchOptions = LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions;

/**
 * {@link DriverPool} implementation backed by puppeteer-cluster.
 */
class PuppeteerDriverPool implements DriverPool {
  constructor(private readonly cluster: Cluster) {}

  public async task(handler: (page: PuppeteerDriverPage, data: EvaluationJobData) => Promise<void>): Promise<void> {
    await this.cluster.task(async ({ page, data }) => {
      await handler(new PuppeteerDriverPage(page), data ?? {});
    });
  }

  public queue(data: EvaluationJobData): void {
    this.cluster.queue(data);
  }

  public idle(): Promise<void> {
    return this.cluster.idle();
  }

  public close(): Promise<void> {
    return this.cluster.close();
  }

  public onTaskError(handler: (error: Error, data: EvaluationJobData) => void): void {
    this.cluster.on('taskerror', handler);
  }
}

/**
 * The default QualWeb {@link Driver}, backed by Puppeteer (via
 * puppeteer-extra) and puppeteer-cluster.
 */
export class PuppeteerDriver implements Driver {
  /**
   * @param options.plugins - puppeteer-extra plugins to enable (stealth and/or adblock).
   * @param options.launchOptions - Puppeteer launch options. Options passed to
   * `QualWeb.start()` take precedence over these.
   */
  constructor(
    private readonly options?: {
      plugins?: PuppeteerPlugins;
      launchOptions?: PuppeteerLaunchOptions;
    }
  ) {
    if (options?.plugins?.stealth) {
      puppeteer.use(StealthPlugin());
    }
    if (options?.plugins?.adBlock) {
      puppeteer.use(AdBlocker({ blockTrackersAndAnnoyances: true }));
    }
  }

  public async launchPool(clusterOptions?: ClusterOptions, browserOptions?: unknown): Promise<DriverPool> {
    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: clusterOptions?.maxConcurrency ?? 1,
      puppeteerOptions: (browserOptions as PuppeteerLaunchOptions) ?? this.options?.launchOptions,
      puppeteer: puppeteer,
      timeout: clusterOptions?.timeout ?? 60 * 1000,
      monitor: clusterOptions?.monitor ?? false
    });

    return new PuppeteerDriverPool(cluster);
  }

  public async launchContext(): Promise<DriverContext> {
    const browser = await puppeteer.launch(this.options?.launchOptions);
    const incognito = await browser.createBrowserContext();

    return {
      newPage: async (): Promise<DriverContextPage> => {
        // Puppeteer's Page satisfies DriverContextPage structurally; the cast
        // bridges the handle-aware evaluate() generics only.
        return (await incognito.newPage()) as unknown as DriverContextPage;
      },
      close: async (): Promise<void> => {
        await incognito.close();
        await browser.close();
      }
    };
  }
}
