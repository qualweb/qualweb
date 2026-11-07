import type { Browser } from 'puppeteer';
import type { DriverPool, EvaluationJobData } from '../../types';
import { PuppeteerDriverPage } from '../PuppeteerDriverPage';
import { releaseBrowser } from '../browser/browserLifecycle';
import type { TaskHandler } from './TaskHandler';

/**
 * Single-execution, fail-fast {@link DriverPool} backed by a plain Puppeteer
 * browser (local or remote). Designed for single-URL evaluations where
 * concurrency and retries are orchestrated externally (e.g., via BullMQ).
 *
 * Each queued job runs in an isolated incognito browser context. Task errors
 * immediately abort execution and are rethrown by `idle()` / `close()`.
 */
export class StandaloneDriverPool implements DriverPool {
  private handler?: TaskHandler;
  private failure?: Error;
  private execution: Promise<void> = Promise.resolve();
  private released = false;

  constructor(
    private readonly browser: Browser,
    private readonly remote: boolean,
    private readonly timeout: number
  ) {}

  public async task(handler: TaskHandler): Promise<void> {
    this.handler = handler;
  }

  public queue(data: EvaluationJobData): void {
    // Chains execution sequentially (normally called once per evaluation)
    this.execution = this.execution.then(() => {
      if (this.failure) return;
      return this.run(data);
    });
  }

  /**
   * Waits for the evaluation to finish. If it failed, releases the browser
   * safely and rethrows the error so the caller/queue worker can catch it.
   */
  public async idle(): Promise<void> {
    await this.execution;
    if (this.failure) {
      await this.safeRelease();
      throw this.failure;
    }
  }

  public async close(): Promise<void> {
    try {
      await this.idle();
    } finally {
      await this.safeRelease();
    }
  }

  /** No-op: errors are propagated directly via `throw` in `idle()` / `close()`. */
  public onTaskError(): void {
    // intentionally empty
  }

  private async run(data: EvaluationJobData): Promise<void> {
    if (!this.handler) {
      this.failure = new Error('StandaloneDriverPool: task handler must be registered before queueing.');
      return;
    }

    const context = await this.browser.createBrowserContext();
    let timer: NodeJS.Timeout | undefined;

    try {
      const page = await context.newPage();
      const taskPromise = this.handler(new PuppeteerDriverPage(page), data ?? {});
      // Prevent UnhandledPromiseRejection if the page closes after timeout wins the race
      taskPromise.catch(() => undefined);

      await Promise.race([
        taskPromise,
        new Promise<never>((_, reject) => {
          timer = setTimeout(
            () => reject(new Error(`Task timed out after ${this.timeout}ms`)),
            this.timeout
          );
        }),
      ]);
    } catch (error) {
      if (!this.failure) {
        this.failure = error instanceof Error ? error : new Error(String(error));
      }
    } finally {
      if (timer) clearTimeout(timer);
      await context.close().catch(() => undefined);
    }
  }

  private async safeRelease(): Promise<void> {
    if (this.released) return;
    this.released = true;
    await releaseBrowser(this.browser, this.remote).catch(() => undefined);
  }
}