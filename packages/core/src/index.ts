import puppeteer, { Browser, LaunchOptions } from 'puppeteer';
import { QualwebOptions, Evaluations, Execute } from '@qualweb/core';
import { generateEARLReport } from '@qualweb/earl-reporter';
import { Dom } from '@qualweb/dom';
import { Evaluation } from '@qualweb/evaluation';
import Crawl from '@qualweb/crawler';
import fs from 'fs';

class QualWeb {
  /**
   * Chromium browser instance
   */
  private browser: Browser | null = null;

  /**
   * Opens chromium browser
   * @param {LaunchOptions} options - check https://github.com/puppeteer/puppeteer/blob/v8.0.0/docs/api.md#puppeteerlaunchoptions
   */
  public async start(options?: LaunchOptions): Promise<void> {
    this.browser = await puppeteer.launch(options);
  }

  /**
   * Evaluates given options
   *
   * @param {QualwebOptions} options - options of execution (check https://github.com/qualweb/core#options)
   * @returns list of evaluations
   */
  public async evaluate(options: QualwebOptions): Promise<Evaluations> {
    let numberOfParallelEvaluations = 1;
    let html: string | undefined = undefined;
    const modulesToExecute = {
      act: true,
      wcag: true,
      bp: true,
      wappalyzer: false,
      counter: false
    };

    const urls = await this.checkUrls(options);

    if (options.html) {
      html = options.html;
    }

    if (!html && urls.length === 0) {
      throw new Error('Invalid input method');
    }

    if (options.maxParallelEvaluations !== undefined) {
      numberOfParallelEvaluations = parseInt(options.maxParallelEvaluations.toString(), 0);
      if (!Number.isInteger(numberOfParallelEvaluations) || numberOfParallelEvaluations < 1) {
        throw new Error('Invalid MaxParallelEvaluations value');
      }
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

    for (let i = 0; i < urls.length; i += numberOfParallelEvaluations) {
      const promises = new Array<Promise<void>>();
      for (let j = 0; j < numberOfParallelEvaluations && i + j < urls.length; j++) {
        promises.push(this.runModules(evaluations, urls[i + j], html, options, modulesToExecute));
      }
      await Promise.all(promises);
    }

    if (html) {
      await this.runModules(evaluations, '', html, options, modulesToExecute);
    }

    return evaluations;
  }

  /**
   * Closes chromium browser
   */
  public async stop(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }

  /**
   * Checks possible input options and compiles the urls.
   * Possible input options are:
   * - url - single url
   * - urls - multiple urls
   * - file - file with urls
   * - crawler - domain to crawl and gather urls
   *
   * @param {QualwebOptions} options -
   * @returns list of urls
   */
  private async checkUrls(options: QualwebOptions): Promise<Array<string>> {
    let urls = new Array<string>();
    if (options.url) {
      urls.push(decodeURIComponent(options.url).trim());
    }
    if (options.urls) {
      urls = urls.concat(options.urls.map((url: string) => decodeURIComponent(url).trim()));
    }
    if (options.file) {
      urls = urls.concat(await getFileUrls(options.file));
    }
    if (options.crawl) {
      urls = urls.concat(await crawlDomain(options.crawl));
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
    if (this.browser) {
      try {
        const dom = new Dom();

        const { sourceHtml, page, validation } = await dom.getDOM(this.browser, options, url, html ?? '');
        const evaluation = new Evaluation();
        const evaluationReport = await evaluation.evaluatePage(
          sourceHtml,
          page,
          modulesToExecute,
          options,
          url,
          validation
        );
        await dom.close();
        evaluations[url ?? 'customHtml'] = evaluationReport.getFinalReport();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

/**
 * Reads a file to obtain the urls to evaluate
 *
 * @param {string} file - path to file of urls
 * @returns list of decoded urls
 */
async function getFileUrls(file: string): Promise<Array<string>> {
  const content = await readFile(file);
  return content
    .split('\n')
    .filter((url: string) => url.trim() !== '')
    .map((url: string) => decodeURIComponent(url).trim());
}

/**
 * Crawls a domain to find all webpages urls
 *
 * @param {string} domain - web domain to crawl
 * @returns list of decoded urls
 */
async function crawlDomain(domain: string): Promise<Array<string>> {
  const crawler = new Crawl(domain);
  await crawler.start();
  return crawler.getResults().map((url: string) => decodeURIComponent(url).trim());
}

/**
 * Reads a file to obtain the urls to evaluate
 *
 * @param {string} file - path to file of urls
 * @returns file data
 */
function readFile(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(err);
      else resolve(data.toString());
    });
  });
}

export { QualWeb, generateEARLReport, crawlDomain, getFileUrls };
