/**
 * 
 */
'use strict';

import { BPOptions, BestPracticesReport } from '@qualweb/best-practices';
import { Page } from 'puppeteer';
import { CSSStylesheet } from '@qualweb/core';

import mapping from './best-practices/mapping.json';

import { 
  bestPractices,
  bestPracticesToExecute
} from './best-practices';

function configure(options: BPOptions): void {
  resetConfiguration();
  
  if (options.bestPractices) {
    options.bestPractices = options.bestPractices.map(bp => {
      return bp.toUpperCase().trim();
    });
    for (const bp of Object.keys(bestPractices) || []) {
      bestPracticesToExecute[bp] = options.bestPractices.includes(bp);
    }
  }
}

function resetConfiguration(): void {
  for (const bp in bestPracticesToExecute) {
    bestPracticesToExecute[bp] = true;
  }
}

async function executeBP(bestPractice: string, selector: string, page: Page | undefined, styleSheets: CSSStylesheet[] | undefined, report: BestPracticesReport): Promise<void> {
  if(selector === ''){
    await bestPractices[bestPractice].execute(undefined, undefined, styleSheets);
    report['best-practices'][bestPractice] = bestPractices[bestPractice].getFinalResults();
    report.metadata[report['best-practices'][bestPractice].metadata.outcome]++;
    bestPractices[bestPractice].reset();
  } else if(page) {
    const elements = await page.$$(selector);
    const promises = new Array<any>();
    if (elements.length > 0) {
      for (const elem of elements || []) {
        promises.push(bestPractices[bestPractice].execute(elem, page));
      }
    } else {
      promises.push(bestPractices[bestPractice].execute(undefined, page));
    }
    await Promise.all(promises);

    report['best-practices'][bestPractice] = bestPractices[bestPractice].getFinalResults();
    report.metadata[report['best-practices'][bestPractice].metadata.outcome]++;
    bestPractices[bestPractice].reset();
  }
}

async function executeBestPractices(page: Page, styleSheets: CSSStylesheet[]): Promise<BestPracticesReport> {
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
      promises.push(executeBP(bestPractice, selector, page, styleSheets, report));
    }
  }

  await Promise.all(promises);

  return report;
}

export { 
  configure,
  resetConfiguration,
  executeBestPractices 
};