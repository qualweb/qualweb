import type { Page, LaunchOptions, BrowserLaunchArgumentOptions, BrowserConnectOptions, Viewport } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import { Cluster } from 'puppeteer-cluster';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdBlocker from 'puppeteer-extra-plugin-adblocker';
import { readFile } from 'fs';
import 'colors';
import type {
  QualwebReport,
} from './lib/evaluation/QualwebReport';
import { PuppeteerLifeCycleEvent as LoadEvent } from 'puppeteer';
import { Crawler, CrawlOptions } from '@qualweb/crawler';
import {
  EvaluationManager,
  QualwebPage,
  PluginManager,
  ErrorManager,
  QualwebOptions,
  QualwebPlugin,
  PuppeteerPlugins,
  ClusterOptions,
} from './lib';

/**
 * QualWeb engine - Performs web accessibility evaluations using several modules:
 * - act-rules module (https://github.com/qualweb/qualweb/tree/main/packages/act-rules)
 * - wcag-techniques module (https://github.com/qualweb/qualweb/tree/main/packages/wcag-techniques)
 * - best-practices module (https://github.com/qualweb/qualweb/tree/main/packages/best-practices)
 */
export class QualWeb {
  /**
   * Chromium browser cluster.
   */
  private cluster?: Cluster;

  /**
   * Array of plugins added with QualWeb.use().
   */
  private readonly pluginManager = new PluginManager();

  /**
   * Initializes puppeteer with given plugins.
   *
   * @param {PuppeteerPlugins} plugins - Plugins for puppeteer - supported: AdBlocker and Stealth.
   */
  constructor(plugins?: PuppeteerPlugins) {
    if (plugins?.stealth) {
      puppeteer.use(StealthPlugin());
    }
    if (plugins?.adBlock) {
      puppeteer.use(AdBlocker({ blockTrackersAndAnnoyances: true }));
    }
  }

  /**
   * Starts chromium browser cluster.
   *
   * @param {ClusterOptions} clusterOptions - Options for cluster initialization.
   * @param {LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions} puppeteerOptions - check https://github.com/puppeteer/puppeteer/blob/v9.1.1/docs/api.md#puppeteerlaunchoptions.
   */
  public async start(
    clusterOptions?: ClusterOptions,
    puppeteerOptions?: LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions
  ): Promise<void> {
    this.cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: clusterOptions?.maxConcurrency ?? 1,
      puppeteerOptions,
      puppeteer: puppeteer,
      timeout: clusterOptions?.timeout ?? 60 * 1000,
      monitor: clusterOptions?.monitor ?? false
    });
  }

  /**
   * Adds a plugin to be run when executing a QualWeb evaluation.
   * Plugins are called in the same order they were added to the instance.
   *
   * @param {QualwebPlugin} plugin - The plugin to add.
   * @returns The Qualweb instance itself. Good for chaining.
   */
  public use(plugin: QualwebPlugin): this {
    this.pluginManager.use(plugin);
    return this;
  }

  /**
   * Closes chromium browser cluster.
   */
  public async stop(): Promise<void> {
    await this.cluster?.close();
  }

  /**
   * Evaluates given options.
   *
   * @param {QualwebOptions} options - Options of execution (check https://github.com/qualweb/core#options).
   * @returns List of reports.
   */
  public async evaluate(options: QualwebOptions): Promise<Record<string, QualwebReport>> {
    const urls = await this.checkUrls(options);

    if (!options.translate) {
      // WARN: no language set, defaulting to English.
      options.translate = 'en';
    }

    const errorManager = new ErrorManager(options.log);
    errorManager.handle(this.cluster);

    const reports: Record<string, QualwebReport> = {};

    await this.handlePageEvaluations(reports, options);
    this.addUrlsToEvaluate(urls);
    this.addHtmlCodeToEvaluate(options.html);

    await this.cluster?.idle();

    errorManager.showErrorsIfAny();

    return reports;
  }

  private async handlePageEvaluations(reports: Record<string, QualwebReport>, options: QualwebOptions): Promise<void> {
    await this.cluster?.task(async ({ page, data: { url, html } }) => {
      const qwPage = new QualwebPage(this.pluginManager, page, url, html);
      const evaluationManager = new EvaluationManager(qwPage);
      reports[url ?? 'customHtml'] = await evaluationManager.evaluate(options);
    });
  }

  private addUrlsToEvaluate(urls: string[]): void {
    urls.forEach((url) => this.cluster?.queue({ url }));
  }

  private addHtmlCodeToEvaluate(html?: string): void {
    this.cluster?.queue({ html });
  }

  /**
   * Crawls a domain to find all urls.
   *
   * @param {string} domain - Domain to crawl.
   * @param {CrawlOptions} options - Options for crawling process.
   * @Param {Viewport} viewport - Set the viewport of the webpages.
   * @param {LoadEvent | LoadEvent[]} waitUntil - Wait for dom events before starting the crawling process.
   * @returns List of decoded urls.
   */
  public async crawl(
    domain: string,
    options?: CrawlOptions,
    viewport?: Viewport,
    waitUntil?: LoadEvent | LoadEvent[]
  ): Promise<string[]> {
    const browser = await puppeteer.launch();
    const incognito = await browser.createBrowserContext();
    const crawler = new Crawler(incognito, domain, viewport, waitUntil);
    await crawler.crawl(options);

    const results = crawler.getResults();

    await incognito.close();
    await browser.close();

    return results;
  }

  /**
   * Checks possible input options and compiles the urls.
   * Possible input options are:
   * - url - single url;
   * - urls - multiple urls;
   * - filepath - path to file with urls;
   * - crawler - domain to crawl and gather urls.
   *
   * @param {QualwebOptions} options - QualWeb options.
   * @returns List of urls.
   */
  private async checkUrls(options: QualwebOptions): Promise<string[]> {
    const urls: string[] = [];
    if (options.url) {
      urls.push(decodeURIComponent(options.url).trim());
    }
    if (options.urls) {
      urls.push(...options.urls.map((url) => decodeURIComponent(url).trim()));
    }
    if (options.file) {
      urls.push(...(await getFileParsedUrls(options.file)));
    }
    if (options.crawl) {
      const viewport = {
        width: 0,
        height: 0,
        isMobile: false,
        isLandscape: true
      };
      if (options.viewport) {
        viewport.width = options?.viewport?.resolution?.width ?? 0;
        viewport.height = options?.viewport?.resolution?.height ?? 0;
        viewport.isMobile = options?.viewport?.mobile ?? false;
        viewport.isLandscape = options?.viewport?.landscape ?? true;
      }
      urls.push(
        ...(await this.crawl(
          options.crawl,
          options.crawlOptions,
          viewport.width + viewport.height !== 0 ? viewport : undefined,
          options.waitUntil
        ))
      );
    }

    if ((options.html === undefined || options.html.trim() === '') && urls.length === 0) {
      throw new Error('Invalid input method');
    }

    return urls;
  }

  /**
   * Converts a Puppeteer page to a QualwebPage
   * (Only used for testing purposes)
   *
   * @param {Page} page - Puppeteer page to convert
   * @returns Qualweb Page
   */
  public static createPage(page: Page): QualwebPage {
    return new QualwebPage(new PluginManager(), page);
  }
}

/**
 * Reads a file to obtain the urls to evaluate.
 *
 * @param {string} file - Path to file of urls.
 * @returns List of decoded urls.
 */
export async function getFileParsedUrls(file: string): Promise<Array<string>> {
  const content = await readFileData(file);
  return content
    .split('\n')
    .map((url) => {
      try {
        return decodeURIComponent(url).trim();
      } catch (_err) {
        return '';
      }
    })
    .filter((url) => url.trim());
}

/**
 * Reads a file.
 *
 * @param {string} file - Path to file.
 * @returns File data converted to UTF-8.
 */
function readFileData(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
    readFile(file, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString('utf-8'));
      }
    });
  });
}
