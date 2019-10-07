'use strict';

import { EvaluationReport, QualwebOptions } from '@qualweb/core';
import { getFileUrls, crawlDomain } from './managers/startup.manager';
import { evaluate } from './managers/module.manager';
import { EarlOptions, EarlReport, generateEARLReport } from '@qualweb/earl-reporter';

class System {

  private urls: Array<string>;
  private evaluations: Array<EvaluationReport>;

  constructor() {
    this.urls = new Array<string>();
    this.evaluations = new Array<EvaluationReport>();
  }

  public async startup(options: QualwebOptions): Promise<void> {
    this.urls = new Array<string>();
    this.evaluations = new Array<EvaluationReport>();
    
    if (options.url) {
      this.urls.push(options.url);
    } else if (options.file) {
      this.urls.push(...(await getFileUrls(options.file)));
    } else if (options.crawl) {
      this.urls.push(...(await crawlDomain(options.crawl)));
    } else {
      throw new Error('Invalid input method');
    }
  }

  public async execute(options: QualwebOptions): Promise<void> {
    for (const url of this.urls || []) {
      const evaluation = await evaluate(url, options);
      this.evaluations.push(evaluation.getFinalReport());
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