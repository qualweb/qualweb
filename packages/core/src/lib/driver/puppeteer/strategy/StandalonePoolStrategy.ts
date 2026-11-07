import type { DriverPool } from '../../types';
import { openBrowser } from '../browser/browserLifecycle';
import { StandaloneDriverPool } from '../pool/StandaloneDriverPool';
import type { PoolRequest, PoolStrategy } from './PoolStrategy';

/**
 * Plain Puppeteer strategy: opens one browser (local or remote) and executes
 * the evaluation in an isolated incognito context without internal clustering.
 */
export class StandalonePoolStrategy implements PoolStrategy {
  public async launch({ chrome, timeout }: PoolRequest): Promise<DriverPool> {
    const browser = await openBrowser(chrome);
    return new StandaloneDriverPool(browser, chrome.remote, timeout);
  }
}