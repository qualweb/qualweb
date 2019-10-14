'use strict';

import { EvaluationReport, QualwebOptions } from '@qualweb/core';
import { getFileUrls, crawlDomain } from './managers/startup.manager';
import { evaluate } from './managers/module.manager';
import { EarlOptions, EarlReport, generateEARLReport } from '@qualweb/earl-reporter';

class System {

  private urls: Array<string>;
  private evaluations: Array<EvaluationReport>;
  private force: boolean;
  private modulesToExecute: any;

  constructor() {
    this.urls = new Array<string>();
    this.evaluations = new Array<EvaluationReport>();
    this.force = false;
    this.modulesToExecute = {
      act: true,
      html: true,
      css: true,
      bp: true,
      wappalyzer: false
    };
  }

  public async startup(options: QualwebOptions): Promise<void> {
    this.urls = new Array<string>();
    this.evaluations = new Array<EvaluationReport>();
    
    if (options.url) {
      this.urls.push(decodeURIComponent(options.url).trim());
    } else if (options.urls) {
      this.urls = options.urls.map((url: string) => decodeURIComponent(url).trim());
    } else if (options.file) {
      this.urls = await getFileUrls(options.file);
    } else if (options.crawl) {
      this.urls = await crawlDomain(options.crawl);
    } else {
      throw new Error('Invalid input method');
    }

    if (options.force) {
      this.force = options.force;
    }

    if (options.execute) {
      this.modulesToExecute.act = options.execute.act ? options.execute.act : false;
      this.modulesToExecute.html = options.execute.html ? options.execute.html : false;
      this.modulesToExecute.css = options.execute.css ? options.execute.css : false;
      this.modulesToExecute.bp = options.execute.bp ? options.execute.bp : false;
      this.modulesToExecute.wappalyzer = options.execute.wappalyzer ? options.execute.wappalyzer : false;
    }
  }

  public async execute(options: QualwebOptions): Promise<void> {
    for (const url of this.urls || []) {
      try {
        const evaluation = await evaluate(url, this.modulesToExecute, options);
        this.evaluations.push(evaluation.getFinalReport());
      } catch(err) {
        if (!this.force) {
          console.error(err);
          break;
        }
      }
    }
  }

  public async report(earl: boolean, options?: EarlOptions): Promise<Array<EvaluationReport> | Array<EarlReport>> {
    if (earl || options) {
      return generateEARLReport(this.evaluations, options);
    } else {
      return this.evaluations;
    }
  }
}

export = System;