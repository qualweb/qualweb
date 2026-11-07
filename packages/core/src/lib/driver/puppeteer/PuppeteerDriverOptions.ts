import type { LaunchOptions, ConnectOptions } from 'puppeteer';
import type { PuppeteerPlugins } from '../../PuppeteerPlugins';

export type PuppeteerLaunchOptions = LaunchOptions &
  ConnectOptions & {
    /**
     * WebSocket endpoint URL for connecting to a remote Chrome instance.
     * 
     * @example 'ws://browserless:3000'
     */
    browserWSEndpoint?: string;
    /**
     * HTTP URL for connecting to a remote Chrome instance with remote debugging enabled.
     * 
     * @example 'http://chrome:9222'
     */
    browserURL?: string;
  };

export interface PuppeteerDriverOptions {
  /**
   * Puppeteer-extra plugins to enable for browser automation.
   * 
   * Supports stealth and adblock plugins.
   */
  plugins?: PuppeteerPlugins;
  /**
   * Puppeteer launch and connection options.
   * 
   * When `browserWSEndpoint` or `browserURL` is specified (either directly or via
   * `chromeUrl`), the driver connects to a remote Chrome instance instead of launching
   * a local browser. Options provided to `QualWeb.start()` override these settings.
   */
  launchOptions?: PuppeteerLaunchOptions;
  /**
   * Convenient shorthand for specifying the Chrome instance to use.
   * 
   * - WebSocket URLs (`ws://` or `wss://`) are mapped to `browserWSEndpoint`
   * - HTTP URLs (`http://` or `https://`) are mapped to `browserURL`
   */
  chromeUrl?: string;
  /**
   * Enable puppeteer-cluster for pool-based browser management.
   * 
   * When `true`(default), uses puppeteer-cluster for `launchPool()`. When `false`,
   * uses a standard Puppeteer browser with a simple concurrency-limited queue.
   * 
   * @default true
   */
   useCluster?: boolean;
}
