'use strict';

import puppeteer, { Browser, LaunchOptions } from 'puppeteer';
import {  QualwebOptions, EvaluationReport } from '@qualweb/core';
import { getFileUrls, crawlDomain } from './lib/managers/startup.manager';
import { EarlOptions, EarlReport, generateEARLReport } from '@qualweb/earl-reporter';
import { Dom } from '@qualweb/dom';
import { Evaluation } from '@qualweb/evaluation';


class System {

  private urls: Array<string>;
  private html: string | undefined;
  private evaluations: { [url: string]: EvaluationReport };
  private force: boolean;
  private numberOfParallelEvaluations = 1;
  private modulesToExecute: any;

  private browser: Browser | null = null;

  constructor() {
    this.urls = new Array<string>();
    this.html = undefined;
    this.evaluations = {};
    this.force = false;
    this.modulesToExecute = {
      act: true,
      html: true,
      css: true,
      bp: true,
      wappalyzer: false
    };
  }

  public async start(options?: LaunchOptions): Promise<void> {
    this.browser = await puppeteer.launch(options);
  }

  public async update(options: QualwebOptions): Promise<void> {
    this.urls = new Array<string>();
    this.evaluations = {};

    if (options.url) {
      this.urls.push(decodeURIComponent(options.url).trim());
    }
    if (options.urls) {
      this.urls = this.urls.concat(options.urls.map((url: string) => decodeURIComponent(url).trim()));
    }
    if (options.file) {
      this.urls = this.urls.concat(await getFileUrls(options.file));
    }
    if (options.crawl) {
      this.urls = this.urls.concat(await crawlDomain(options.crawl));
    }

    /*FIXME
    if (options.html) {
      this.html = options.html;
    }*/

    if (!this.html && this.urls.length === 0) {
      throw new Error('Invalid input method');
    }

    if (options.maxParallelEvaluations !== undefined) {
      this.numberOfParallelEvaluations = parseInt(options.maxParallelEvaluations.toString(), 0);
      if (!Number.isInteger(this.numberOfParallelEvaluations) || this.numberOfParallelEvaluations < 1) {
        throw new Error('Invalid MaxParallelEvaluations value');
      }
    }

    if (this.urls.length < this.numberOfParallelEvaluations) {
      this.numberOfParallelEvaluations = this.urls.length;
    }

    if (options.force) {
      this.force = !!options.force;
    } else {
      this.force = false;
    }

    if (options.execute) {
      this.modulesToExecute.act = options.execute.act ? options.execute.act : false;
      this.modulesToExecute.html = options.execute.html ? options.execute.html : false;
      this.modulesToExecute.css = options.execute.css ? options.execute.css : false;
      this.modulesToExecute.bp = options.execute.bp ? options.execute.bp : false;
      this.modulesToExecute.wappalyzer = options.execute.wappalyzer ? options.execute.wappalyzer : false;
    } else {
      this.modulesToExecute = {
        act: true,
        html: true,
        css: true,
        bp: true,
        wappalyzer: false
      };
    }
  }

  public async execute(options: QualwebOptions): Promise<void> {
    for (let i = 0; i < this.urls.length; i += this.numberOfParallelEvaluations) {
      const promises = new Array<any>();
      for (let j = 0; j < this.numberOfParallelEvaluations && i + j < this.urls.length; j++) {
        promises.push(this.runModulesUrl(this.urls[i + j], options));
      }
      await Promise.all(promises);
    }

    if (this.html) {
      await this.runModulesHtml(options);
    }
  }

  public async report(earl: boolean, options?: EarlOptions): Promise<{ [url: string]: EvaluationReport } | { [url: string]: EarlReport }> {
    if (!this.html && (earl || options)) {
      return generateEARLReport(this.evaluations, options);
    } else {
      return this.evaluations;
    }
  }

  public async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }

  private async runModulesUrl(url: string, options: QualwebOptions): Promise<void> {
    if (this.browser) {
      try {
        let dom = new Dom();
        let { sourceHtml, page, stylesheets, mappedDOM } = await dom.getDOM(this.browser, options, url, "");
        let evaluation = new Evaluation();
        const evaluationReport = await evaluation.evaluatePage(sourceHtml, page, stylesheets, mappedDOM, this.modulesToExecute, options, url);
        dom.close();
        this.evaluations[url] = evaluationReport.getFinalReport();
      } catch (err) {
        if (!this.force) {
          console.error(err);
        }
      }
    }
  }

  private async runModulesHtml(options: QualwebOptions): Promise<void> {
    if (this.browser && this.html) {
      try {
        let dom = new Dom();
        let { sourceHtml, page, stylesheets, mappedDOM } = await dom.getDOM(this.browser, options, "", this.html);
        let evaluation = new Evaluation();
        const evaluationReport = await evaluation.evaluatePage(sourceHtml, page, stylesheets, mappedDOM, this.modulesToExecute, options,"");
        dom.close();
        this.evaluations['customHtml'] = evaluationReport.getFinalReport();
      } catch (err) {
        if (!this.force) {
          console.error(err);
        }
      }
    }
  }

}

export = System;