import puppeteer, { Browser, LaunchOptions } from 'puppeteer';
import { QualwebOptions, EvaluationReport, Execute } from '@qualweb/core';
import { EarlOptions, EarlReport, generateEARLReport } from '@qualweb/earl-reporter';
import { Dom } from '@qualweb/dom';
import { Evaluation } from '@qualweb/evaluation';
import Crawl from '@qualweb/crawler';
import fs from 'fs';

class QualWeb {
  private browser: Browser | null = null;

  public async start(options?: LaunchOptions): Promise<void> {
    this.browser = await puppeteer.launch(options);
  }

  public async evaluate(options: QualwebOptions): Promise<{ [url: string]: EvaluationReport }> {
    let numberOfParallelEvaluations = 1;
    let html: string | undefined = undefined;
    const modulesToExecute = {
      act: true,
      wcag: true,
      bp: true,
      wappalyzer: false
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
    }

    const evaluations: { [url: string]: EvaluationReport } = {};

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

  public async stop(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }

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

  private async runModules(
    evaluations: { [url: string]: EvaluationReport },
    url: string,
    html: string | undefined,
    options: QualwebOptions,
    modulesToExecute: Execute
  ): Promise<void> {
    if (this.browser) {
      try {
        const dom = new Dom();

        const { sourceHtml, page, validation } = await dom.getDOM(this.browser, options, url, html || '');
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
        evaluations[url || 'customHtml'] = evaluationReport.getFinalReport();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

async function generateEarlReport(
  evaluations: { [url: string]: EvaluationReport },
  options?: EarlOptions
): Promise<{ [url: string]: EarlReport }> {
  return <{ [url: string]: EarlReport }>await generateEARLReport(evaluations, options);
}

async function getFileUrls(file: string): Promise<Array<string>> {
  const content = await readFile(file);
  return content
    .split('\n')
    .filter((url: string) => url.trim() !== '')
    .map((url: string) => decodeURIComponent(url).trim());
}

async function crawlDomain(domain: string): Promise<Array<string>> {
  const crawler = new Crawl(domain);
  await crawler.start();
  return crawler.getResults().map((url: string) => decodeURIComponent(url).trim());
}

function readFile(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(err);
      else resolve(data.toString());
    });
  });
}

export { QualWeb, generateEarlReport, crawlDomain, getFileUrls };
