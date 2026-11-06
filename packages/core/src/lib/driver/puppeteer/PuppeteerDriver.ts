import type { ClusterOptions } from '../../ClusterOptions';
import type { Driver, DriverContext, DriverPool } from '../types';
import { createDriverContext } from './browser/createDriverContext';
import { registerPlugins } from './browser/registerPlugins';
import { resolveChrome } from './browser/resolveChrome';
import type { PuppeteerDriverOptions, PuppeteerLaunchOptions } from './PuppeteerDriverOptions';
import { createPoolStrategy } from './strategy/createPoolStrategy';
import type { PoolStrategy } from './strategy/PoolStrategy';

export type { PuppeteerDriverOptions, PuppeteerLaunchOptions } from './PuppeteerDriverOptions';

/**
 * The default QualWeb {@link Driver}, backed by Puppeteer via puppeteer-extra.
 * 
 * Pool behavior is determined by the {@link PoolStrategy} selected through the
 * `useCluster` flag. Chrome instances (local or remote) are configured via
 * launch options or `chromeUrl`.
 *
 * @example
 * ```typescript
 * const driver = new PuppeteerDriver({
 *   useCluster: true,
 *   launchOptions: { browserWSEndpoint: 'ws://browserless:3000' },
 * });
 * ```
 */
export class PuppeteerDriver implements Driver {
  private readonly poolStrategy: PoolStrategy;

  constructor(private readonly options?: PuppeteerDriverOptions) {
    registerPlugins(options?.plugins);
    this.poolStrategy = createPoolStrategy(options?.useCluster);
  }

  public launchPool(clusterOptions?: ClusterOptions, browserOptions?: unknown): Promise<DriverPool> {
    return this.poolStrategy.launch({
      chrome: resolveChrome(this.options, browserOptions as PuppeteerLaunchOptions | undefined),
      maxConcurrency: clusterOptions?.maxConcurrency ?? 1,
      timeout: clusterOptions?.timeout ?? 60 * 1000,
      monitor: clusterOptions?.monitor ?? false,
    });
  }

  public launchContext(): Promise<DriverContext> {
    return createDriverContext(resolveChrome(this.options));
  }
}