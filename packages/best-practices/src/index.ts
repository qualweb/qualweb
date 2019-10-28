/**
 * 
 */
'use strict';

import { BestPracticesReport } from '@qualweb/best-practices';
import { DomElement } from 'htmlparser2';
const stew = new(require('stew-select')).Stew();

import mapping from './best-practices/mapping.json';

import { bestPractices } from './best-practices';

async function executeBestPractices(dom: DomElement[]): Promise<BestPracticesReport> {

  if (!dom) {
    throw new Error(`Invalid dom`);
  }

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
      console.log(selector);
      let elements = stew.select(dom, selector);
      
      if (elements.length > 0) {
        for (const elem of elements || []) {
          await bestPractices[bestPractice].execute(elem, dom);
        }
      } else {
        await bestPractices[bestPractice].execute(undefined, dom);
      }
      report['best-practices'][bestPractice] = bestPractices[bestPractice].getFinalResults();
      report.metadata[report['best-practices'][bestPractice].metadata.outcome]++;
      bestPractices[bestPractice].reset();
    }
  }

  return report;
}

export { executeBestPractices };