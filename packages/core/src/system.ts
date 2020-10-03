import puppeteer, { Browser, LaunchOptions } from 'puppeteer';
import { QualwebOptions, EvaluationReport } from '@qualweb/core';
import { getFileUrls, crawlDomain } from './lib/managers/startup.manager';
import { EarlOptions, EarlReport, generateEARLReport } from '@qualweb/earl-reporter';
import { Dom } from '@qualweb/dom';
import { Evaluation } from '@qualweb/evaluation';

class System {

  private browser: Browser | null = null;

  public async start(options?: LaunchOptions): Promise<void> {
    this.browser = await puppeteer.launch(options);
  }

  public async execute(options: QualwebOptions): Promise<{[url: string]: EvaluationReport}> {
    let urls = new Array<string>();
    const evaluations = {};
    let numberOfParallelEvaluations = 1;
    let html: string | undefined = undefined;
    let force = false;
    let modulesToExecute = {
      act: true,
      html: true,
      css: true,
      bp: true,
      wappalyzer: false
    };

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

    if (options.force) {
      force = !!options.force;
    } else {
      force = false;
    }

    if (options.execute) {
      modulesToExecute.act = options.execute.act ? options.execute.act : false;
      modulesToExecute.html = options.execute.html ? options.execute.html : false;
      modulesToExecute.css = options.execute.css ? options.execute.css : false;
      modulesToExecute.bp = options.execute.bp ? options.execute.bp : false;
      modulesToExecute.wappalyzer = options.execute.wappalyzer ? options.execute.wappalyzer : false;
    } else {
      modulesToExecute = {
        act: true,
        html: true,
        css: true,
        bp: true,
        wappalyzer: false
      };
    }

    for (let i = 0; i < urls.length; i += numberOfParallelEvaluations) {
      const promises = new Array<Promise<void>>();
      for (let j = 0; j < numberOfParallelEvaluations && i + j < urls.length; j++) {
        promises.push(this.runModules(evaluations, urls[i + j], html,  options, modulesToExecute, force));
      }
      await Promise.all(promises);
    }

    if (html) {
      await this.runModules(evaluations, '', html, options, modulesToExecute, force);
    }

    return evaluations;
  }

  public async report(evaluations: {[url: string]: EvaluationReport}, options?: EarlOptions): Promise<{ [url: string]: EvaluationReport } | { [url: string]: EarlReport }> {
    return generateEARLReport(evaluations, options);
  }

  public async stop(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }

  private async runModules(evaluations: any, url: string, html: string | undefined, options: QualwebOptions, modulesToExecute: any, force: boolean): Promise<void> {
    if (this.browser) {
      try {
        const dom = new Dom();
        
        const { sourceHtml, page, validation } = await dom.getDOM(this.browser, options, url, html || '');
        const evaluation = new Evaluation();
        const evaluationReport = await evaluation.evaluatePage(sourceHtml, page, modulesToExecute, options, url, validation);
        await dom.close();
        evaluations[url || 'customHtml'] = evaluationReport.getFinalReport();
      } catch (err) {
        if (!force) {
          console.error(err);
        }
      }
    }
  }
}

export = System;