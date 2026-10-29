import type { Browser, BrowserContext, Page } from 'playwright';
import type { ClusterOptions } from '../../ClusterOptions';
import type { DriverPage, DriverPool, EvaluationJobData } from '../types';
import { PlaywrightDriverPage } from './PlaywrightDriverPage';

/**
 * {@link DriverPool} implementation for Playwright. Mirrors the semantics
 * QualWeb consumed from puppeteer-cluster's CONCURRENCY_CONTEXT mode: one
 * shared browser, one isolated incognito context per job, at most
 * `maxConcurrency` jobs in flight, and a per-job timeout that reports
 * through the task error handler instead of rejecting.
 */
export class PlaywrightDriverPool implements DriverPool {
  private handler?: (page: DriverPage, data: EvaluationJobData) => Promise<void>;
  private readonly errorHandlers: Array<(error: Error, data: EvaluationJobData) => void> = [];
  private readonly pending: EvaluationJobData[] = [];
  private readonly idleResolvers: Array<() => void> = [];
  private readonly cancellations = new Set<() => void>();
  private active = 0;
  private closed = false;
  private closePromise?: Promise<void>;

  private readonly maxConcurrency: number;
  private readonly timeout: number;

  private browserUserAgentPromise?: Promise<string>;

  constructor(
    private readonly browser: Browser,
    clusterOptions?: ClusterOptions,
    private readonly setupPage?: (page: Page) => Promise<void>
  ) {
    this.maxConcurrency = clusterOptions?.maxConcurrency ?? 1;
    // Same default as puppeteer-cluster's job timeout in the Puppeteer driver.
    this.timeout = clusterOptions?.timeout ?? 60 * 1000;
    if (!Number.isInteger(this.maxConcurrency) || this.maxConcurrency < 1 ||
        !Number.isFinite(this.timeout) || this.timeout <= 0) {
      throw new RangeError('Concurrency must be a positive integer and timeout must be positive.');
    }
  }

  public async task(handler: (page: DriverPage, data: EvaluationJobData) => Promise<void>): Promise<void> {
    this.handler = handler;
  }

  public queue(data: EvaluationJobData): void {
    if (this.closed) {
      throw new Error('Cannot queue evaluations on a closed browser pool.');
    }
    this.pending.push(data);
    this.pump();
  }

  public idle(): Promise<void> {
    if (this.active === 0 && this.pending.length === 0) {
      return Promise.resolve();
    }
    return new Promise((resolve) => this.idleResolvers.push(resolve));
  }

  public close(): Promise<void> {
    if (!this.closePromise) {
      this.closed = true;
      this.pending.length = 0;
      for (const cancel of this.cancellations) {
        cancel();
      }
      this.closePromise = (async () => {
        await this.browser.close();
        await this.idle();
      })();
    }
    return this.closePromise;
  }

  public onTaskError(handler: (error: Error, data: EvaluationJobData) => void): void {
    this.errorHandlers.push(handler);
  }

  private pump(): void {
    while (!this.closed && this.active < this.maxConcurrency && this.pending.length > 0) {
      const data = this.pending.shift() as EvaluationJobData;
      this.active++;
      void this.runJob(data).finally(() => {
        this.active--;
        this.pump();
      });
    }
    this.checkIdle();
  }

  private async runJob(data: EvaluationJobData): Promise<void> {
    let page: PlaywrightDriverPage | undefined;
    let initializingContext: BrowserContext | undefined;
    let finished = false;
    const handler = this.handler;
    const execute = async (): Promise<void> => {
      if (!handler) {
        throw new Error('No task handler was registered on the pool.');
      }
      const userAgent = await this.getBrowserUserAgent();
      if (finished) return;
      page = await PlaywrightDriverPage.create(this.browser, userAgent, async (native) => {
        initializingContext = native.context();
        if (finished) {
          throw new Error('Evaluation job has already ended.');
        }
        await this.setupPage?.(native);
      });
      if (finished) {
        await page.dispose();
        return;
      }
      await handler(page, data);
    };
    try {
      await this.withTimeout(execute());
    } catch (error) {
      this.reportTaskError(error, data);
    } finally {
      finished = true;
      try {
        try {
          await page?.dispose();
        } finally {
          await initializingContext?.close();
        }
      } catch (error) {
        this.reportTaskError(error, data);
      }
    }
  }

  private reportTaskError(error: unknown, data: EvaluationJobData): void {
    if (this.closed) return;
    const wrapped = error instanceof Error ? error : new Error(String(error));
    for (const handler of this.errorHandlers) {
      handler(wrapped, data);
    }
  }

  private withTimeout<T>(promise: Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const cancel = (): void => {
        clearTimeout(timer);
        this.cancellations.delete(cancel);
        reject(new Error('Browser pool closed.'));
      };
      const timer = setTimeout(
        () => {
          this.cancellations.delete(cancel);
          reject(new Error(`Timeout hit: ${this.timeout}`));
        },
        this.timeout
      );
      this.cancellations.add(cancel);
      promise.then(
        (value) => {
          clearTimeout(timer);
          this.cancellations.delete(cancel);
          resolve(value);
        },
        (error) => {
          clearTimeout(timer);
          this.cancellations.delete(cancel);
          reject(error);
        }
      );
    });
  }

  private checkIdle(): void {
    if (this.active === 0 && this.pending.length === 0) {
      const resolvers = this.idleResolvers.splice(0);
      for (const resolve of resolvers) {
        resolve();
      }
    }
  }

  /**
   * The browser's default user agent (with no context override). Playwright
   * has no direct equivalent of Puppeteer's Browser.userAgent(), so it is
   * read once from a throwaway context and cached.
   */
  private getBrowserUserAgent(): Promise<string> {
    if (!this.browserUserAgentPromise) {
      this.browserUserAgentPromise = (async (): Promise<string> => {
        const context = await this.browser.newContext();
        try {
          const page = await context.newPage();
          return await page.evaluate(() => navigator.userAgent);
        } finally {
          await context.close();
        }
      })();
    }
    return this.browserUserAgentPromise;
  }
}
