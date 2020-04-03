'use strict';

import { BPOptions, BestPracticesReport } from '@qualweb/best-practices';
import { Page } from 'puppeteer';
import { CSSStylesheet } from '@qualweb/core';

import mapping from './best-practices/mapping';

import QW_BP1 from './best-practices/QW-BP1';
import QW_BP2 from './best-practices/QW-BP2';
import QW_BP3 from './best-practices/QW-BP3';
import QW_BP4 from './best-practices/QW-BP4';
import QW_BP5 from './best-practices/QW-BP5';
import QW_BP6 from './best-practices/QW-BP6';
import QW_BP7 from './best-practices/QW-BP7';
import QW_BP8 from './best-practices/QW-BP8';
import QW_BP9 from './best-practices/QW-BP9';
import QW_BP10 from './best-practices/QW-BP10';
import QW_BP11 from './best-practices/QW-BP11';
import QW_BP12 from './best-practices/QW-BP12';
import QW_BP13 from './best-practices/QW-BP13';
import QW_BP14 from './best-practices/QW-BP14';
import QW_BP15 from './best-practices/QW-BP15';
import QW_BP16 from './best-practices/QW-BP16';

class BestPractices {

  private bestPractices: any;

  private bestPracticesToExecute = {
    'QW-BP1': true,
    'QW-BP2': true,
    'QW-BP3': true,
    'QW-BP4': true,
    'QW-BP5': true,
    'QW-BP6': true,
    'QW-BP7': true,
    'QW-BP8': true,
    'QW-BP9': true,
    'QW-BP10': true,
    'QW-BP11': true,
    'QW-BP12': true,
    'QW-BP13': true,
    'QW-BP14': true,
    'QW-BP15': true,
    'QW-BP16': true
  };

  constructor(options?: BPOptions) {
    this.bestPractices = {
      'QW-BP1': new QW_BP1(),
      'QW-BP2': new QW_BP2(),
      'QW-BP3': new QW_BP3(),
      'QW-BP4': new QW_BP4(),
      'QW-BP5': new QW_BP5(),
      'QW-BP6': new QW_BP6(),
      'QW-BP7': new QW_BP7(),
      'QW-BP8': new QW_BP8(),
      'QW-BP9': new QW_BP9(),
      'QW-BP10': new QW_BP10(),
      'QW-BP11': new QW_BP11(),
      'QW-BP12': new QW_BP12(),
      'QW-BP13': new QW_BP13(),
      'QW-BP14': new QW_BP14(),
      'QW-BP15': new QW_BP15(),
      'QW-BP16': new QW_BP16()
    };

    if (options) {
      this.configure(options);
    }
  }

  public configure(options: BPOptions): void {
    this.resetConfiguration();
    
    if (options.bestPractices) {
      options.bestPractices = options.bestPractices.map(bp => bp.toUpperCase().trim());
      for (const bp of Object.keys(this.bestPractices) || []) {
        this.bestPracticesToExecute[bp] = options.bestPractices.includes(bp);
      }
    }
  }

  public resetConfiguration(): void {
    for (const bp in this.bestPracticesToExecute || {}) {
      this.bestPracticesToExecute[bp] = true;
    }
  }

  private async executeBP(bestPractice: string, selector: string, page: Page | undefined, styleSheets: CSSStylesheet[] | undefined, report: BestPracticesReport): Promise<void> {
    if(selector === ''){
      await this.bestPractices[bestPractice].execute(undefined, page, styleSheets);
      report['best-practices'][bestPractice] = this.bestPractices[bestPractice].getFinalResults();
      report.metadata[report['best-practices'][bestPractice].metadata.outcome]++;
      this.bestPractices[bestPractice].reset();
    } else if(page) {
      const elements = await page.$$(selector);
      const promises = new Array<any>();
      if (elements.length > 0) {
        for (const elem of elements || []) {
          promises.push(this.bestPractices[bestPractice].execute(elem, page));
        }
      } else {
        promises.push(this.bestPractices[bestPractice].execute(undefined, page));
      }
      await Promise.all(promises);

      report['best-practices'][bestPractice] = this.bestPractices[bestPractice].getFinalResults();
      report.metadata[report['best-practices'][bestPractice].metadata.outcome]++;
      this.bestPractices[bestPractice].reset();
    }
  }

  public async execute(page: Page, styleSheets: CSSStylesheet[]): Promise<BestPracticesReport> {
    const report: BestPracticesReport = {
      type: 'best-practices',
      metadata: {
        passed: 0,
        warning: 0,
        failed: 0,
        inapplicable: 0
      },
      'best-practices': {}
    };

    const promises = new Array<any>();

    for (const selector of Object.keys(mapping) || []) {
      for (const bestPractice of mapping[selector] || []) {
        if (this.bestPracticesToExecute[bestPractice]) {
          promises.push(this.executeBP(bestPractice, selector, page, styleSheets, report));
        }
      }
    }

    await Promise.all(promises);

    return report;
  }
}

export {
  BestPractices
};