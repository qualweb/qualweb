/**
 * 
 */
'use strict';

import { BestPracticesReport } from '@qualweb/best-practices';
import { Page } from 'puppeteer';

import mapping from './best-practices/mapping.json';

import { bestPractices } from './best-practices';

async function executeBestPractices(page: Page): Promise<BestPracticesReport> {
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

  for (const selector of Object.keys(mapping) || []) {
    for (const bestPractice of mapping[selector] || []) {
   
      const elements = await page.$$(selector);
      
      if (elements.length > 0) {
        for (const elem of elements || []) {
          await bestPractices[bestPractice].execute(elem, page);
          await elem.dispose();
        }
      } else {
        await bestPractices[bestPractice].execute(undefined, page);
      }
      report['best-practices'][bestPractice] = bestPractices[bestPractice].getFinalResults();
      report.metadata[report['best-practices'][bestPractice].metadata.outcome]++;
      bestPractices[bestPractice].reset();
    }
  }

  return report;
}

export { executeBestPractices };