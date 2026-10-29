import type { LaunchOptions } from 'puppeteer';
import puppeteer from 'puppeteer';
import { Cluster } from 'puppeteer-cluster';
import type { ClusterOptions } from '@qualweb/core/lib';
import type {
  Driver,
  DriverContext,
  DriverContextPage,
  DriverPool,
  EvaluationJobData,
} from '@qualweb/core';
import { PuppeteerDriverPage } from './PuppeteerDriverPage';

export type PuppeteerLaunchOptions = LaunchOptions;

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
 * Opt-in QualWeb driver backed by maintained Puppeteer and puppeteer-cluster.
 */
export class PuppeteerDriver implements Driver {
  /**
   * @param options.launchOptions - Puppeteer launch options. Options passed to
   * `QualWeb.start()` take precedence over these.
   */
  constructor(
    private readonly options?: {
      launchOptions?: PuppeteerLaunchOptions;
    }
  ) {}

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
