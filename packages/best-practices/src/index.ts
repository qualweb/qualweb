'use strict';

import { BPOptions, BestPracticesReport } from '@qualweb/best-practices';
import { Page, ElementHandle } from 'puppeteer';
import { CSSStylesheet } from '@qualweb/core';

import * as bestPractices from './lib/bestPractices';

import mapping from './lib/mapping';

class BestPractices {

  private bestPractices: any;
  private bestPracticesToExecute: any;

  constructor(options?: BPOptions) {
    this.bestPractices = {};
    this.bestPracticesToExecute = {};
    
    for(const bp of Object.keys(bestPractices) || []) {
      const _bp = bp.replace(/_/g, '-');
      this.bestPractices[_bp] = new bestPractices[bp]();
      this.bestPracticesToExecute[_bp] = true;
    }

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

  private async evaluateElement(bestPractice: string, element: ElementHandle | undefined, page: Page, styleSheets: CSSStylesheet[]): Promise<void> {
    try {
      await this.bestPractices[bestPractice].execute(element, page, styleSheets);
    } catch (err) {
      console.error(err);
    }
  }

  private async executeBP(bestPractice: string, selector: string, page: Page, styleSheets: CSSStylesheet[], report: BestPracticesReport): Promise<void> {
    if(selector === ''){
      await this.evaluateElement(bestPractice, undefined, page, styleSheets);
    } else if(page) {
      const elements = await page.$$(selector);
      const promises = new Array<any>();
      if (elements.length > 0) {
        for (const elem of elements || []) {
          promises.push(this.evaluateElement(bestPractice, elem, page, styleSheets));
        }
      } else {
        promises.push(this.evaluateElement(bestPractice, undefined, page, styleSheets));
      }
    }

    report.assertions[bestPractice] = this.bestPractices[bestPractice].getFinalResults();
    report.metadata[report.assertions[bestPractice].metadata.outcome]++;
    this.bestPractices[bestPractice].reset();
  }

  public execute(page: Page, styleSheets: CSSStylesheet[]): BestPracticesReport {
    const report: BestPracticesReport = {
      type: 'best-practices',
      metadata: {
        passed: 0,
        warning: 0,
        failed: 0,
        inapplicable: 0
      },
      assertions: {}
    };

    const promises = new Array<any>();

    for (const selector of Object.keys(mapping) || []) {
      for (const bestPractice of mapping[selector] || []) {
        if (this.bestPracticesToExecute[bestPractice]) {
          promises.push(this.executeBP(bestPractice, selector, page, styleSheets, report));
        }
      }
    }


    return report;
  }
}

export {
  BestPractices
};