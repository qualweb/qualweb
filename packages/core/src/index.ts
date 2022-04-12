import { LaunchOptions, BrowserLaunchArgumentOptions, BrowserConnectOptions, Viewport } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import { Cluster } from 'puppeteer-cluster';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdBlocker from 'puppeteer-extra-plugin-adblocker';
import { QualwebOptions, Evaluations, PuppeteerPlugins, ClusterOptions, LoadEvent, QualwebPlugin } from '@qualweb/core';
import { generateEARLReport } from '@qualweb/earl-reporter';
import { Dom } from '@qualweb/dom';
import { Evaluation } from '@qualweb/evaluation';
import { Crawler, CrawlOptions } from '@qualweb/crawler';
import locales, { Lang, Locale, TranslationObject } from '@qualweb/locale';
import { readFile, writeFile, unlink } from 'fs';
import path from 'path';
import 'colors';

/**
 * QualWeb engine - Performs web accessibility evaluations using several modules:
 * - act-rules module (https://github.com/qualweb/act-rules)
 * - wcag-techniques module (https://github.com/qualweb/wcag-techniques)
 * - best-practices module (https://github.com/qualweb/best-practices)
 */
class QualWeb {
  /**
   * Chromium browser cluster.
   */
  private cluster?: Cluster;

  /**
   * Array of plugins added with QualWeb.use().
   */
  private qualwebPlugins: QualwebPlugin[] = [];

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
      puppeteer.use(AdBlocker({ blockTrackers: true }));
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
      puppeteerOptions: puppeteerOptions,
      puppeteer: puppeteer,
      timeout: clusterOptions?.timeout ?? 60 * 1000,
      monitor: clusterOptions?.monitor ?? false
    });
  }

  /**
   * Adds a plugin to be run when executing a QualWeb evaluation. Plugins are
   * called in the same order they were added to the instance.
   * @param plugin The plugin to add.
   * @returns The QualWeb instance itself. Good for chaining.
   */
  public use(plugin: QualwebPlugin): this {
    this.qualwebPlugins.push(plugin);

    return this;
  }

  /**
   * Closes chromium browser.
   */
  public async stop(): Promise<void> {
    await this.cluster?.close();
  }

  /**
   * Evaluates given options.
   *
   * @param {QualwebOptions} options - Options of execution (check https://github.com/qualweb/core#options).
   * @returns List of evaluations.
   */
  public async evaluate(options: QualwebOptions): Promise<Evaluations> {
    const modulesToExecute = {
      act: true,
      wcag: true,
      bp: true,
      wappalyzer: false,
      counter: false
    };

    const urls = await this.checkUrls(options);

    if ((options.html === undefined || options.html.trim() === '') && urls.length === 0) {
      throw new Error('Invalid input method');
    }

    this.handleLocales(options);

    if (options.execute) {
      modulesToExecute.act = !!options.execute.act;
      modulesToExecute.wcag = !!options.execute.wcag;
      modulesToExecute.bp = !!options.execute.bp;
      modulesToExecute.wappalyzer = !!options.execute.wappalyzer;
      modulesToExecute.counter = !!options.execute.counter;
    }

    const evaluations: Evaluations = {};

    let foundError = false;

    const timestamp = new Date().getTime();

    handleError(
      options,
      'Evaluation errors',
      new Date(timestamp).toISOString().replace(/T/, ' ').replace(/\..+/, '') + '\n-----------',
      timestamp
    );

    this.cluster?.on('taskerror', (err, data) => {
      foundError = true;
      handleError(options, data.url, err.message + '\n-----------', timestamp);
    });

    await this.cluster?.task(async ({ page, data: { url, html } }) => {
      const dom = new Dom(page, options.validator);

      // Execute beforePageLoad on all plugins in order. If any exceptions
      // occur during the execution of a plugin, it should bubble up past the
      // call to Qualweb.evaluate() so the user can handle it on their own.
      for (const plugin of this.qualwebPlugins) {
        if (typeof plugin.beforePageLoad === 'function') {
          await plugin.beforePageLoad(page, url || 'customHtml');
        }
      }

      const { sourceHtml, validation } = await dom.process(options, url ?? '', html ?? '');
      const evaluation = new Evaluation(url, page, modulesToExecute);

      // Execute afterPageLoad on all plugins in order. Same assumptions for
      // exceptions apply as they did for beforePageLoad.
      for (const plugin of this.qualwebPlugins) {
        if (typeof plugin.afterPageLoad === 'function') {
          await plugin.afterPageLoad(page, url || 'customHtml');
        }
      }

      const evaluationReport = await evaluation.evaluatePage(sourceHtml, options, validation);
      evaluations[url || 'customHtml'] = evaluationReport.getFinalReport();
    });

    for (const url of urls) {
      this.cluster?.queue({ url });
    }

    if (options.html) {
      this.cluster?.queue({ html: options.html });
    }

    await this.cluster?.idle();

    if (options.log?.file) {
      if (foundError) {
        console.warn('One or more urls failed to evaluate. Check the error.log for more information.'.yellow);
      } else {
        deleteErrorLogFile(timestamp);
      }
    }

    return evaluations;
  }

  /**
   * Crawls a webpage to find all urls.
   *
   * @param {string} startingUrl - Webpage to crawl.
   * @param {CrawlOptions} options - Options for crawling process.
   * @Param {Viewport} viewport - Set the viewport of the webpages.
   * @param {LoadEvent | Array<LoadEvent>} waitUntil - Wait for dom events before starting the crawling process.
   * @returns List of decoded urls.
   */
  public async crawl(
    domain: string,
    options?: CrawlOptions,
    viewport?: Viewport,
    waitUntil?: LoadEvent | Array<LoadEvent>
  ): Promise<Array<string>> {
    const browser = await puppeteer.launch();
    const incognito = await browser.createIncognitoBrowserContext();
    const crawler = new Crawler(incognito, domain, viewport, waitUntil);
    await crawler.crawl(options);
    return crawler.getResults();
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
  private async checkUrls(options: QualwebOptions): Promise<Array<string>> {
    const urls = new Array<string>();
    if (options.url) {
      urls.push(decodeURIComponent(options.url).trim());
    }
    if (options.urls) {
      urls.push(...options.urls.map((url: string) => decodeURIComponent(url).trim()));
    }
    if (options.file) {
      urls.push(...(await getFileUrls(options.file)));
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

    return urls;
  }

  private handleLocales(options: QualwebOptions): void {
    if (options.translate) {
      if (typeof options.translate === 'string') {
        if (Object.keys(locales).includes(options.translate)) {
          options.translate = {
            translate: locales[<Lang>options.translate],
            fallback: locales.en
          };
        } else {
          throw new Error(`Locale "${options.translate}" not supported.`);
        }
      } else if (Object.keys(options.translate).includes('translate')) {
        this.verifyTranslationObject(options);
      } else {
        options.translate = {
          translate: <Locale>options.translate,
          fallback: locales.en
        };
      }
    } else {
      options.translate = {
        translate: locales.en,
        fallback: locales.en
      };
    }
  }

  private verifyTranslationObject(options: QualwebOptions): void {
    if (typeof (<TranslationObject>options.translate).translate === 'string') {
      if (Object.keys(locales).includes(<string>(<TranslationObject>options.translate).translate)) {
        options.translate = {
          translate: locales[<Lang>(<TranslationObject>options.translate).translate],
          fallback: locales.en
        };
      } else {
        throw new Error(`Locale "${(<TranslationObject>options.translate).translate}" not supported.`);
      }
    }
    if (typeof (<TranslationObject>options.translate).fallback === 'string') {
      if (Object.keys(locales).includes(<string>(<TranslationObject>options.translate).fallback)) {
        (<TranslationObject>options.translate).fallback =
          locales[<Lang>(<TranslationObject>options.translate).fallback];
      } else {
        throw new Error(`Locale "${(<TranslationObject>options.translate).fallback}" not supported.`);
      }
    }
  }
}

/**
 * Reads a file to obtain the urls to evaluate.
 *
 * @param {string} file - Path to file of urls.
 * @returns List of decoded urls.
 */
async function getFileUrls(file: string): Promise<Array<string>> {
  const content = await readFileData(file);
  return content
    .split('\n')
    .map((url: string) => {
      try {
        return decodeURIComponent(url).trim();
      } catch (_err) {
        return '';
      }
    })
    .filter((url: string) => url.trim() !== '');
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

/**
 * Logs evaluation errors to a error log file.
 *
 * @param {options} QualwebOptions - options to check logging method
 * @param {string} url - Url that failed to evaluate.
 * @param {string} message - Error message of the evaluation.
 * @param {number} timestamp - Date of the evaluation.
 */
function handleError(options: QualwebOptions, url: string, message: string, timestamp: number): void {
  if (options.log && options.log.file) {
    writeFile(
      path.resolve(process.cwd(), `qualweb-errors-${timestamp}.log`),
      url + ' : ' + message + '\n',
      { flag: 'a', encoding: 'utf-8' },
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
  }
  if (options.log && options.log.console) {
    console.error(url + ' : ' + message + '\n');
  }
}

/**
 * Deletes the error log file created at the beginning of the evaluation if there aren't any errors to report.
 *
 * @param {number} timestamp - Date of the evaluation.
 */
function deleteErrorLogFile(timestamp: number): void {
  unlink(path.resolve(process.cwd(), `qualweb-errors-${timestamp}.log`), (err) => {
    if (err) {
      throw err;
    }
  });
}

export { QualWeb, generateEARLReport, getFileUrls };
