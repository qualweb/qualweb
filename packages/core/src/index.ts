import { Browser, BrowserContext, LaunchOptions } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import { Cluster } from 'puppeteer-cluster';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdBlocker from 'puppeteer-extra-plugin-adblocker';
import { QualwebOptions, Evaluations, Execute } from '@qualweb/core';
import { generateEARLReport } from '@qualweb/earl-reporter';
import { Dom } from '@qualweb/dom';
import { Evaluation } from '@qualweb/evaluation';
import { Crawler, CrawlOptions } from '@qualweb/crawler';
import { readFile } from 'fs';

/**
 * QualWeb engine - Performs web accessibility evaluations using several modules:
 * - act-rules module (https://github.com/qualweb/act-rules)
 * - wcag-techniques module (https://github.com/qualweb/wcag-techniques)
 * - best-practices module (https://github.com/qualweb/best-practices)
 */
class QualWeb {
  /**
   * Chromium browser instance
   */
  private browser?: Browser;

  /**
   * Incognito context (no cache, no cookies)
   */
  private incognito?: BrowserContext;

  private cluster?: Cluster;

  constructor(plugins?: { stealth?: boolean; adBlock?: boolean }) {
    if (plugins?.stealth) {
      puppeteer.use(StealthPlugin());
    }
    if (plugins?.adBlock) {
      puppeteer.use(AdBlocker({ blockTrackers: true }));
    }
  }

  /**
   * Opens chromium browser and starts an incognito context
   * @param {LaunchOptions} options - check https://github.com/puppeteer/puppeteer/blob/v8.0.0/docs/api.md#puppeteerlaunchoptions
   */
  public async start(options?: LaunchOptions): Promise<void> {
    this.browser = await puppeteer.launch(options);
    this.incognito = await this.browser.createIncognitoBrowserContext();

    this.cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: 5,
      puppeteerOptions: options,
      puppeteer: puppeteer,
      timeout: 60 * 1000,
      monitor: true
    });
  }

  /**
   * Closes chromium browser.
   */
  public async stop(): Promise<void> {
    await this.incognito?.close();
    await this.browser?.close();
    await this.cluster?.close();
  }

  /**
   * Evaluates given options.
   *
   * @param {QualwebOptions} options - Options of execution (check https://github.com/qualweb/core#options).
   * @returns List of evaluations.
   */
  public async evaluate(options: QualwebOptions): Promise<Evaluations> {
    let numberOfParallelEvaluations = 1;

    const modulesToExecute = {
      act: true,
      wcag: true,
      bp: true,
      wappalyzer: false,
      counter: false
    };

    const urls = await this.checkUrls(options);

    if (!!options.html && urls.length === 0) {
      throw new Error('Invalid input method');
    }

    if (options.maxParallelEvaluations && options.maxParallelEvaluations > 0) {
      numberOfParallelEvaluations = options.maxParallelEvaluations;
    }

    if (urls.length < numberOfParallelEvaluations) {
      numberOfParallelEvaluations = urls.length;
    }

    if (options.execute) {
      modulesToExecute.act = !!options.execute.act;
      modulesToExecute.wcag = !!options.execute.wcag;
      modulesToExecute.bp = !!options.execute.bp;
      modulesToExecute.wappalyzer = !!options.execute.wappalyzer;
      modulesToExecute.counter = !!options.execute.counter;
    }

    const evaluations: Evaluations = {};

    this.cluster?.on('taskerror', (err, data) => {
      console.error(`Failed to crawl ${data}: ${err.message}`);
    });

    await this.cluster?.task(async ({ page, data: url }) => {
      const dom = new Dom(page, options.validator);
      const { sourceHtmlHeadContent, validation } = await dom.process(options, url, '');
      const evaluation = new Evaluation(url, page, modulesToExecute);
      const evaluationReport = await evaluation.evaluatePage(sourceHtmlHeadContent, options, validation);
      evaluations[url || 'customHtml'] = evaluationReport.getFinalReport();
    });

    for (const url of urls) {
      this.cluster?.queue(url);
    }

    /*for (let i = 0; i < urls.length; i += numberOfParallelEvaluations) {
      const promises = new Array<Promise<void>>();
      for (let j = 0; j < numberOfParallelEvaluations && i + j < urls.length; j++) {
        promises.push(this.runModules(evaluations, urls[i + j], undefined, options, modulesToExecute));
      }
      await Promise.all(promises);
    }*/

    if (options.html) {
      await this.runModules(evaluations, '', options.html, options, modulesToExecute);
    }

    await this.cluster?.idle();

    return evaluations;
  }

  /**
   * Crawls a domain to find all webpages urls.
   *
   * @param {string} domain - Web domain to crawl.
   * @param {CrawlOptions} options - Options for crawling process.
   * @returns List of decoded urls.
   */
  public async crawlDomain(domain: string, options?: CrawlOptions): Promise<Array<string>> {
    if (this.browser) {
      const crawler = new Crawler(this.browser, domain);
      await crawler.crawl(options);
      return crawler.getResults();
    }

    throw new Error(`Chromium browser isn't open.`);
  }

  /**
   * Checks possible input options and compiles the urls.
   * Possible input options are:
   * - url - single url
   * - urls - multiple urls
   * - filepath - path to file with urls
   * - crawler - domain to crawl and gather urls
   *
   * @param {QualwebOptions} options - qualweb options
   * @returns list of urls
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
      urls.push(...(await this.crawlDomain(options.crawl, options.crawlOptions)));
    }

    return urls;
  }

  /**
   * Executes defined modules on the given url or html code and saves the evaluation on the list of evaluations.
   *
   * @param {Evaluations} evaluations - list of evaluations
   * @param {string} url - url to be evaluated
   * @param {string | undefined} html - html code to be evaluated (optional)
   * @param {QualwebOptions} options - options of execution (check https://github.com/qualweb/core#options)
   * @param {Execute} modulesToExecute - modules to execute (act, wcag, best-practices, wappalyzer, counter)
   */
  private async runModules(
    evaluations: Evaluations,
    url: string,
    html: string | undefined,
    options: QualwebOptions,
    modulesToExecute: Execute
  ): Promise<void> {
    if (!this.browser || !this.incognito) {
      throw new Error(`Chromium browser isn't open.`);
    }
    const page = await this.incognito.newPage();
    try {
      const dom = new Dom(page, options.validator);
      const { sourceHtmlHeadContent, validation } = await dom.process(options, url, html ?? '');
      const evaluation = new Evaluation(url, page, modulesToExecute);
      const evaluationReport = await evaluation.evaluatePage(sourceHtmlHeadContent, options, validation);
      evaluations[url || 'customHtml'] = evaluationReport.getFinalReport();
    } catch (err) {
      console.error(err);
    } finally {
      await page.close();
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
    .filter((url: string) => url.trim() !== '')
    .map((url: string) => decodeURIComponent(url).trim());
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

export { QualWeb, generateEARLReport, getFileUrls };
