import type { PuppeteerDriverOptions, PuppeteerLaunchOptions } from '../PuppeteerDriverOptions';
 
export interface ResolvedChrome {
  options: PuppeteerLaunchOptions;
  /** Indicates whether the options point to a remote Chrome instance (WebSocket endpoint or browser URL). */
  remote: boolean;
}
 
/**
 * Merges driver options with per-call overrides and determines whether Chrome
 * should be launched locally or connected to remotely.
 */
export function resolveChrome(
  base: PuppeteerDriverOptions | undefined,
  override?: PuppeteerLaunchOptions
): ResolvedChrome {
  const options: PuppeteerLaunchOptions = { ...(base?.launchOptions ?? {}), ...(override ?? {}) };
 
  const url = base?.chromeUrl;
  if (url && !options.browserWSEndpoint && !options.browserURL) {
    if (/^wss?:\/\//i.test(url)) options.browserWSEndpoint = url;
    else options.browserURL = url;
  }
 
  return { options, remote: Boolean(options.browserWSEndpoint || options.browserURL) };
}
