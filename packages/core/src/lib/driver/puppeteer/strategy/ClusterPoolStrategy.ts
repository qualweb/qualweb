import puppeteer from 'puppeteer-extra';
import { Cluster } from 'puppeteer-cluster';
import type { DriverPool } from '../../types';
import type { PuppeteerLaunchOptions } from '../PuppeteerDriverOptions';
import { ClusterDriverPool } from '../pool/ClusterDriverPool';
import type { PoolRequest, PoolStrategy } from './PoolStrategy';

type ClusterLaunchArgument = Parameters<typeof Cluster.launch>[0];
type ExtraConnectOptions = Parameters<typeof puppeteer.connect>[0];

export class ClusterPoolStrategy implements PoolStrategy {
  public async launch({ chrome, maxConcurrency, timeout, monitor }: PoolRequest): Promise<DriverPool> {
    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency,
      puppeteerOptions: chrome.options as unknown as ClusterLaunchArgument['puppeteerOptions'],
      puppeteer: chrome.remote ? this.connectingPuppeteer() : puppeteer,
      timeout,
      monitor,
    });

    return new ClusterDriverPool(cluster);
  }

  /**
   * puppeteer-cluster only calls `puppeteer.launch()`, so for a remote Chrome
   * it gets an adapter whose `launch` connects instead.
   */
  private connectingPuppeteer(): unknown {
    return {
      launch: (options: PuppeteerLaunchOptions) =>
        puppeteer.connect(options as unknown as ExtraConnectOptions),
    };
  }
}