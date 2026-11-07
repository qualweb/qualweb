import type { Page } from 'puppeteer';
import type { Cluster } from 'puppeteer-cluster';
import type { DriverPool, EvaluationJobData } from '../../types';
import { PuppeteerDriverPage } from '../PuppeteerDriverPage';
import type { TaskHandler } from './TaskHandler';

/**
 * {@link DriverPool} implementation backed by puppeteer-cluster.
 * 
 * Task errors are reported through the `onTaskError` callback.
 */
export class ClusterDriverPool implements DriverPool {
  constructor(private readonly cluster: Cluster) {}

  public async task(handler: TaskHandler): Promise<void> {
    await this.cluster.task(async ({ page, data }) => {
      // Type cast required due to puppeteer-cluster internal type mismatch with Puppeteer v24.
      await handler(new PuppeteerDriverPage(page as unknown as Page), data ?? {});
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