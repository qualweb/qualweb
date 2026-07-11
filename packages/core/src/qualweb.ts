import type { Page } from 'puppeteer';
import { readFile } from 'fs';
import 'colors';
import type {
  QualwebReport,
} from './lib/evaluation/QualwebReport';
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
import type { Driver, DriverPool, DriverViewport, LoadEvent } from './lib/driver/types';
import { PuppeteerDriver, PuppeteerLaunchOptions } from './lib/driver/puppeteer/PuppeteerDriver';
import { PuppeteerDriverPage } from './lib/driver/puppeteer/PuppeteerDriverPage';

/**
 * QualWeb engine - Performs web accessibility evaluations using several modules:
 * - act-rules module (https://github.com/qualweb/qualweb/tree/main/packages/act-rules)
 * - wcag-techniques module (https://github.com/qualweb/qualweb/tree/main/packages/wcag-techniques)
 * - best-practices module (https://github.com/qualweb/qualweb/tree/main/packages/best-practices)
 */
export class QualWeb {
  /**
   * Browser automation driver. Defaults to Puppeteer.
   */
  private readonly driver: Driver;

  /**
   * Browser pool used for evaluations.
   */
  private pool?: DriverPool;

  /**
   * Array of plugins added with QualWeb.use().
   */
  private readonly pluginManager = new PluginManager();

  /**
   * Initializes the browser automation driver.
   *
   * @param {PuppeteerPlugins} plugins - Plugins for the default Puppeteer
   * driver - supported: AdBlocker and Stealth. Ignored when a custom driver
   * is given.
   * @param {Driver} driver - Custom browser automation driver. Defaults to
   * the Puppeteer driver.
   */
  constructor(plugins?: PuppeteerPlugins, driver?: Driver) {
    this.driver = driver ?? new PuppeteerDriver({ plugins });
  }

  /**
   * Starts the browser (pool) used for evaluations.
   *
   * @param {ClusterOptions} clusterOptions - Options for pool initialization.
   * @param {PuppeteerLaunchOptions} puppeteerOptions - Launch options for the
   * default Puppeteer driver - check https://pptr.dev/api/puppeteer.launchoptions.
   * Custom drivers receive their launch options at construction time instead
   * and may ignore this parameter.
   */
  public async start(
    clusterOptions?: ClusterOptions,
    puppeteerOptions?: PuppeteerLaunchOptions
  ): Promise<void> {
    this.pool = await this.driver.launchPool(clusterOptions, puppeteerOptions);
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
   * Closes the browser (pool).
   */
  public async stop(): Promise<void> {
    await this.pool?.close();
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
    errorManager.handle(this.pool);

    const reports: Record<string, QualwebReport> = {};

    await this.handlePageEvaluations(reports, options);
    this.addUrlsToEvaluate(urls);

    if (options.html) {
      this.addHtmlCodeToEvaluate(options.html);
    }

    await this.pool?.idle();

    errorManager.showErrorsIfAny();

    return reports;
  }

  private async handlePageEvaluations(reports: Record<string, QualwebReport>, options: QualwebOptions): Promise<void> {
    await this.pool?.task(async (page, { url, html }) => {
      const qwPage = new QualwebPage(this.pluginManager, page, url, html);
      const evaluationManager = new EvaluationManager(qwPage);
      reports[url ?? 'customHtml'] = await evaluationManager.evaluate(options);
    });
  }

  private addUrlsToEvaluate(urls: string[]): void {
    urls.forEach((url) => this.pool?.queue({ url }));
  }

  private addHtmlCodeToEvaluate(html?: string): void {
    this.pool?.queue({ html });
  }

  /**
   * Crawls a domain to find all urls.
   *
   * @param {string} domain - Domain to crawl.
   * @param {CrawlOptions} options - Options for crawling process.
   * @Param {DriverViewport} viewport - Set the viewport of the webpages.
   * @param {LoadEvent | LoadEvent[]} waitUntil - Wait for dom events before starting the crawling process.
   * @returns List of decoded urls.
   */
  public async crawl(
    domain: string,
    options?: CrawlOptions,
    viewport?: DriverViewport,
    waitUntil?: LoadEvent | LoadEvent[]
  ): Promise<string[]> {
    const context = await this.driver.launchContext();
    const crawler = new Crawler(context, domain, viewport, waitUntil);
    await crawler.crawl(options);

    const results = crawler.getResults();

    await context.close();

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
    return new QualwebPage(new PluginManager(), new PuppeteerDriverPage(page));
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
