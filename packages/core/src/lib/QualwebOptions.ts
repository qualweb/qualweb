import { CrawlOptions } from '@qualweb/crawler';
import { LogOptions } from './LogOptions';
import { PageOptions } from './PageOptions';
import { TranslationOptions } from '@qualweb/locale';
import { PuppeteerLifeCycleEvent } from 'puppeteer';
import { ExecutableModuleContext } from './evaluation';

// Re-export the lifecycle event type we use. Allows clients to rely more
// directly on @qualweb/core instead of pulling this from a potentially
// incompatible version of puppeteer.
export { PuppeteerLifeCycleEvent };

export type QualwebOptions = {
  /**
   * Single URL to evaluate.
   */
  url?: string;

  /**
   * Multiple URLs to evaluate.
   */
  urls?: string[];

  /**
   * Load URLs from file. One URL per line.
   */
  file?: string;

  /**
   * Use @qualweb/crawler to crawl this URL and evaluate.
   * @see {@link QualwebOptions.crawlOptions} for setting additional options.
   */
  crawl?: string;

  /**
   * Additional options passed to @qualweb/crawler when
   * {@link QualwebOptions.crawl} is set.
   */
  crawlOptions?: CrawlOptions;

  /**
   * Raw HTML to evaluate.
   */
  html?: string;

  /**
   * Timeout to reach remote URLs, in milliseconds.
   */
  timeout?: number;

  // FIXME: appears to be unused in code.
  maxParallelEvaluations?: number;

  /**
   * Enable/disable logging to file and stdout.
   */
  log?: LogOptions;

  /**
   * Override the default life cycle event that signals QualWeb to start
   * evaluating. Defaults to 'load'.
   */
  waitUntil?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[];

  /**
   * Override the viewport used by Puppeteer.
   */
  viewport?: PageOptions;

  /**
   * HTML validator service endpoint. The url will be attached after of the
   * given endpoint.
   * FIXME: this needs better documentation. Is this a standard sort of validator?
   */
  validator?: string;

  // FIXME: doesn't seem to be in use by core?
  report?: 'earl' | 'earl-a';

  /**
   * Translate report to the specified locale. See @qualweb/locale for a list
   * of supported languages.
   * Defaults to 'en'.
   */
  translate?: TranslationOptions;

  // FIXME: appears to be unused in code.
  'save-name'?: string;
  
  /**
   * Array of modules to run for each URL in the configuration. See the
   * individual module's readme for specific usage, but it generally boils down
   * to passing a new instance of the module with a desired configuration.
   */
  modules: ExecutableModuleContext[];
};