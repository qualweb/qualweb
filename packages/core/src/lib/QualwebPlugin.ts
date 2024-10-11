import { Page } from 'puppeteer';

export type PageCallback = (page: Page, url: string) => Promise<void> | void;

/**
 * Basic interface for a Qualweb plugin. Plugins are useful when you need to
 * work on a page before letting Qualweb perform evaluation of its contents.
 */
export interface QualwebPlugin {
  /**
   * Called *after* a Page object has been initialized but *before* it loads
   * a target URL and injects Qualweb.
   * Use cases include injecting cookies before page loads, setting the
   * user agent prior to loading the target URL, and even subscribing to
   * console events for diagnostic/logging purposes.
   */
  beforePageLoad?: PageCallback;

  /**
   * Called *after* navigating to a URL that should be evaluated, but before
   * the evaluation itself has been run.
   * Use cases include dismissing banners/popups and adding timer delays to
   * slow-loading pages, to guarantee content has loading prior to Qualweb's
   * evaluation.
   */
  afterPageLoad?: PageCallback;
}
